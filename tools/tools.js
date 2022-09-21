export function getTaskByUniqid(tasks, uniqid) {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task.uniqid === uniqid) {
            return task[i];
        }
    }    
    return undefined;
}