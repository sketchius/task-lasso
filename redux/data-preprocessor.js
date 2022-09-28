
export function processTaskData(task) {
    if (task.dateDue) task.dateDue = new Date(task.dateDue);
    if (task.dateCreated)
        task.dateCreated = new Date(task.dateCreated);
    else task.dateCreated = new Date();
    if (task.dateModified)
        task.dateModified = new Date(task.dateModified);
    if (!task.type) task.type = 'DRAFT';
    if (task.type == 'CAPTURED') {
        task.type = 'NOTE';
        task.iconLibrary = 'MaterialCommunityIcons';
        task.iconName = 'note-outline';
    }

    task.checkboxStyle = 0;
    return task;
}

export function processAppData(appData) {
    
    appData.status = (appData.status || 'CHECK-IN');
    if (!appData.lastUpdateDate)
        appData.lastUpdateDate = new Date();
    else
        appData.lastUpdateDate = new Date(appData.lastUpdateDate);
        

    return appData;
}