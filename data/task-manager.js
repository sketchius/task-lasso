import { setTaskProperty, setAppProperty, setTaskPropertyAll } from './data-manager';
import store from './store';

import isToday from 'date-fns/isToday';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

export function unassign() {
	const tasks = store.getState().tasks;
	setTaskPropertyAll(tasks, 'assigned', false);
	setAppProperty('status', 'CHECK-IN');
	setAppProperty('assignedValue', 0);
}

export function assignTasks(designation, ambition) {
	const tasks = store.getState().tasks;

	setTaskPropertyAll(tasks, 'assigned', false);
	let assignedValue = store.getState().app.assignedValue || 0;

	let assignmentBudget = 0;

	switch (designation) {
		case 0:
			assignmentBudget = 90;
			break;
		case 1:
			assignmentBudget = 165;
			break;
		case 2:
			assignmentBudget = 240;
			break;
	}

	switch (ambition) {
		case 0:
			assignmentBudget = assignmentBudget * 0.75;
			break;
		case 1:
			assignmentBudget = assignmentBudget * 1;
			break;
		case 2:
			assignmentBudget = assignmentBudget * 1.25;
			break;
	}
	const assignTask = task => {
		assignedValue = parseInt(assignedValue) + task.duration;
		setTaskProperty(task, 'assigned', true);
		setTaskProperty(task, 'dateLastAssigned', new Date());
	};

	const scoreTask = task => {
		let baseScore = 1;

		if (task.type == 'SCHEDULED') baseScore = 20;

		if (task.type == 'REPEATING') baseScore = 10;

		let priorityWeight = 1;
		if (task.priority) priorityWeight = (task.priority + 1) / 2;

		let deadlineWeight = 1;
		if (task.type == 'DEADLINE')
			deadlineWeight = 0.5 + 7 / Math.pow(differenceInCalendarDays(new Date(task.dateDue), new Date()), 2);

		let flexibleWeight = 1;
		if (task.type == 'FLEXIBLE' && task.dateCreated)
			flexibleWeight = 1 + differenceInCalendarDays(new Date(), new Date(task.dateCreated)) / 30;

		let defermentWeight = 1;
		if (task.deferments) defermentWeight = 1 + task.deferments / 3;

		let durationWeight = 1;
		if (task.duration) durationWeight = 1 - task.duration / 100;

		let reassignmentWeight = 1;
		if (task.dateLastAssigned)
			reassignmentWeight =
				1 - (1 / (differenceInCalendarDays(new Date(), new Date(task.dateLastAssigned)) + 1)) * 0.99;

		const score =
			baseScore *
			priorityWeight *
			deadlineWeight *
			flexibleWeight *
			defermentWeight *
			durationWeight *
			reassignmentWeight;

		setTaskProperty(task, 'score', score);

		// console.log(`Task "${task.title}" SCORE: ${score}`);
		// console.log(`baseScore = ${baseScore}`);
		// console.log(`priorityWeight = ${priorityWeight}`);
		// console.log(`deadlineWeight = ${deadlineWeight}`);
		// console.log(`flexibleWeight = ${flexibleWeight}`);
		// console.log(`defermentWeight = ${defermentWeight}`);
		// console.log(`durationWeight = ${durationWeight}`);
		// console.log(`reassignmentWeight = ${reassignmentWeight}`);

		// console.log(`============================`);
		return score;
	};

	tasks
		.filter(task => {
			return (
				(task.status || 0) < 1 &&
				(((task.type == 'SCHEDULED' || task.type == 'DEADLINE') && isToday(task.dateDue)) ||
					(task.type == 'REPEATING' &&
						task.dateSeed &&
						task.frequency > 0 &&
						differenceInCalendarDays(new Date(), new Date(task.dateSeed)) % task.frequency == 0))
			);
		})
		.forEach(task => {
			scoreTask(task);
			assignTask(task);
		});

	while (assignedValue < assignmentBudget) {
		let highestScoreTask;
		let highestScore = 0;

		const updatedTasks = store.getState().tasks;

		updatedTasks
			.filter(
				task =>
					(task.status || 0) < 1 &&
					task.type != 'SCHEDULED' &&
					task.type != 'DRAFT' &&
					task.type != 'REPEATING'
			)
			.forEach(task => {
				if (!task.assigned) {
					let taskScore = scoreTask(task);
					if (taskScore > highestScore) {
						highestScore = taskScore;
						highestScoreTask = task;
					}
				}
			});

		if (highestScoreTask) {
			assignTask(highestScoreTask);
		} else break;
	}

	setAppProperty('assignedValue', assignedValue);
	setAppProperty('status', 'ASSIGNED');
	setAppProperty('lastCheckInDate', new Date().toJSON());
}
