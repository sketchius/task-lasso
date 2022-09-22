export function getTaskByUniqid(tasks, uniqid) {
    
    console.log(`searching for task. uniqid = ${uniqid}`)
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task.uniqid === uniqid) {
            
            console.log(`found task!`)
            return tasks[i];
        }
    }    
    console.log(`couldn't find task!`)
    return undefined;
}