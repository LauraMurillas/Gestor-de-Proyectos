// tasks.js

// Importar los modelos
const Task = require('../models/Task');
const Project = require('../models/Project');

// Obtener todas las tareas
export const get_tasks = async function () {
    try {
        const tasks = await Task.findAll({
            include: {
                model: Project,
                attributes: ['projectName'] // Incluye el nombre del proyecto asociado
            }
        });
        return tasks;
    } catch (e) {
        throw new Error('ERROR - [get tasks]: ' + e.message);
    }
};

// Obtener una tarea por ID
export const get_task_by_id = async function({ id }) {
    try {
        const task = await Task.findByPk(id, {
            include: {
                model: Project,
                attributes: ['projectName'] // Incluye el nombre del proyecto asociado
            }
        });
        if (!task) throw new Error('Tarea no encontrada');
        return task;
    } catch (e) {
        throw new Error('ERROR - [get task by id]: ' + e.message);
    }
};

// Crear una nueva tarea
export const create_task = async function ({ task }) {
    try {
        const newTask = await Task.create(task);
        return newTask;
    } catch (e) {
        throw new Error('ERROR - [create task]: ' + e.message);
    }
};

// Actualizar una tarea existente
export const update_task = async function({ task }) {
    try {
        const [affectedRows, updatedTasks] = await Task.update(task, {
            where: { id: task.id },
            returning: true // Devuelve la fila actualizada
        });
        if (affectedRows === 0) throw new Error('Tarea no encontrada o no actualizada');
        return updatedTasks[0]; // Sequelize devuelve una matriz, el segundo elemento es el objeto actualizado
    } catch (e) {
        throw new Error('ERROR - [update task]: ' + e.message);
    }
};

// Eliminar una tarea por ID
export const delete_task = async function ({ id }) {
    try {
        const result = await Task.destroy({ where: { id } });
        if (result === 0) throw new Error('Tarea no encontrada o ya eliminada');
        return { message: 'Tarea eliminada exitosamente' };
    } catch (e) {
        throw new Error('ERROR - [delete task]: ' + e.message);
    }
};
