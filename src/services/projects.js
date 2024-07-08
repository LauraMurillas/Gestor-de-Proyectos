const apiUrl = 'http://localhost:3000/api/projects';

export const get_projects = async function () {
    try {
        const response = await fetch(apiUrl, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [get projects]: ' + e.message);
    }
};

export const get_project_by_id = async function (id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to fetch project');
        }
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [get project by id]: ' + e.message);
    }
};

export const create_project = async function (projectData) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(projectData),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Failed to create project');
        }
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [create project]: ' + e.message);
    }
};

export const update_project = async function (id, projectData) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(projectData),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Failed to update project');
        }
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [update project]: ' + e.message);
    }
};

export const delete_project = async function (id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Failed to delete project');
        }
        return await response.json();
    } catch (e) {
        throw new Error('ERROR - [delete project]: ' + e.message);
    }
};
