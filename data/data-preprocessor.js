import { differenceInCalendarDays, isToday } from 'date-fns';
import { setActionQueue } from './server-communication';

export function processTaskData(task) {
	if (task.dateDue) task.dateDue = new Date(task.dateDue);
	if (task.dateCreated) task.dateCreated = new Date(task.dateCreated);
	else task.dateCreated = new Date();
	if (task.dateModified) task.dateModified = new Date(task.dateModified);
	if (!task.type) task.type = 'DRAFT';
	if (task.type == 'DRAFT' || task.type == 'NOTE') {
		task.type = 'DRAFT';
		task.iconLibrary = 'MaterialCommunityIcons';
		task.iconName = 'note-outline';
	}
	// if (task.status != 4) task.assigned = true;
	// if (task.status == 4 && task.type == 'REPEATING') task.status = 0;
	//if (task.dateLastAssigned && !isToday(new Date(task.dateLastAssigned))) task.assigned = false;

	const auto =
		task.type == 'REPEATING' &&
		task.dateSeed &&
		task.frequency > 0 &&
		differenceInCalendarDays(new Date(), new Date(task.dateSeed)) % task.frequency == 0;

	if (auto) task.assigned = true;

	console.log(`${task.title} auto assign: ${auto}`);
	if (task.type == 'REPEATING' && task.status == 4) task.status = 0;

	return task;
}

export function processAppData(appData) {
	// appData.actionQueue = undefined;
	if (appData.actionQueue) appData.actionQueue = JSON.parse(appData.actionQueue);
	appData.status = appData.status || 'CHECK-IN';
	return appData;
}
