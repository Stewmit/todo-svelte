import { fetchAllTasks, updateTask, createTask, deleteTask } from '$lib/http/taskAPI';
import { tasks, taskSort, taskFilter } from '$lib/stores/task';
import { get } from 'svelte/store';

export async function _loadTasks() {
	fetchAllTasks(get(taskSort), get(taskFilter))
		.then((data) => {
			tasks.set(data);
		})
		.catch((e) => console.error(e.message));
}

export async function _createTask(task) {
	try {
		await createTask(task);
	} catch (e) {
		console.error(e.message);
	}
}

export async function _updateTask(task) {
	try {
		await updateTask(task);
	} catch (e) {
		console.error(e.message);
	}
}

export async function _deleteTask(id) {
	try {
		await deleteTask(id);
	} catch (e) {
		console.error(e.message);
	}
}
