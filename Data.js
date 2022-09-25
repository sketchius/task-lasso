import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveTasks(tasks) {
    if (tasks) {
        try {
            tasks.forEach( (task) => {
                saveTask(task);
            })
        } catch (e) {
            
            console.log(`   Error while saving tasks: ${e}`)
            // Handle Error
        }}
}

async function saveTask(task) {
    const json = JSON.stringify(task)
    await AsyncStorage.setItem(`@tasks/${task.uniqid}`, json);
    //console.log(`AsyncStorage: setting key '@tasks/${task.uniqid}' to ${json}`);
}

export async function printKeys() {
    let keys = await AsyncStorage.getAllKeys();
    console.log(`keys = ${JSON.stringify(keys)}`);
}

export async function saveStatus(status) {
    try {
        await AsyncStorage.setItem('@status', status)
    } catch (e) {
        
        console.log(`   Error while saving status: ${e}`)
        // Handle Error
    }
}


export async function loadTasks() {
    try { 
        const keys = await AsyncStorage.getAllKeys();
        const taskKeys = keys.filter( key => key.includes('tasks/'));
        return await AsyncStorage.multiGet(taskKeys);
    } catch(e) {
        alert(`failed to read tasks: ${e}`)
    }
}

export async function saveData(key,data) {
    try {
        await AsyncStorage.setItem('@' + key, data)
    } catch (e) {
        // Handle Error
    }
}

export async function loadData(key) {
    try {
        return await AsyncStorage.getItem('@' + key)
    } catch(e) {
        // error reading value
    }
}