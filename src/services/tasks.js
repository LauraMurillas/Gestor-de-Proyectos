const apiUrl = 'http://localhost:3000/api/tasks';

export const get_tasks = async function () {
    try {
        const response = await fetch(apiUrl, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [get tasks]: ' + e.message);
    }
};

export const get_task_by_id = async function (id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to fetch task');
        }
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [get task by id]: ' + e.message);
    }
};

export const create_task = async function (taskData) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(taskData),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Failed to create task');
        }
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [create task]: ' + e.message);
    }
};

export const update_task = async function (id, taskData) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(taskData),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [update task]: ' + e.message);
    }
};

export const delete_task = async function (id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [delete task]: ' + e.message);
    }
};
