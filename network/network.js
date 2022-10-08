export const fetchTaskByUniqid = async uniqid => {
	try {
		const response = await fetch(
			`http://192.168.0.191:3000/task/read/${taskId}`
		);
		const json = await response.json();
	} catch (error) {
		console.error(error);
	}
};

export const saveTask = async task => {
	try {
		const response = await fetch(`http://192.168.0.191:3000/task/create`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(task),
		});
		const json = await response.json();
	} catch (error) {
		console.error(error);
	}
};
