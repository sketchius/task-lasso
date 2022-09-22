import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveTasks(tasks) {
    try {
        const json = JSON.stringify(tasks)
        await AsyncStorage.setItem('@taskArray', json)
    } catch (e) {
        // Handle Error
    }
}

export async function loadTasks() {
    try {
        const json = await AsyncStorage.getItem('@taskArray')
        return json != null ? JSON.parse(json) : null;
    } catch(e) {
        alert('failed to read tasks')
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