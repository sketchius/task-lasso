import { isToday } from 'date-fns';
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
	if (task.dateLastAssigned && !isToday(new Date(task.dateLastAssigned))) task.assigned = false;

	return task;
}

export function processAppData(appData) {
	// appData.actionQueue = undefined;
	if (appData.actionQueue) appData.actionQueue = JSON.parse(appData.actionQueue);
	appData.status = appData.status || 'CHECK-IN';
	return appData;
}