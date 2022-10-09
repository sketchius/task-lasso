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
	if (task.status == 4) task.status = 0;
	// if (
	// 	task.title.includes('Mamaw') ||
	// 	task.title.includes('standing') ||
	// 	task.title.includes('trees')
	// ) {
	// 	task.dateLastAssigned = new Date('2022-10-08T14:46:02.954Z');
	// }
	// if (task.title.includes('progress')) {
	// 	task.dateDue = new Date('2022-10-11T14:46:02.954Z');
	// }
	if (task.title.includes('Test')) {
		console.log(task);
	}
	return task;
}

export function processAppData(appData) {
	appData.status = appData.status || 'CHECK-IN';
	if (!appData.lastUpdateDate) appData.lastUpdateDate = new Date();
	else appData.lastUpdateDate = new Date(appData.lastUpdateDate);
	console.log(`Final processedAppDate from local-storage:`);
	console.log(JSON.stringify(appData, null, 4));
	return appData;
}
