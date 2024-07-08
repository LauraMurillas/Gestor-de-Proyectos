const Project = require('../../models/Project');

// Obtener todos los proyectos
async function getProjects() {
  try {
    return await Project.findAll();
  } catch (e) {
    throw new Error('ERROR - [getProjects]: ' + e.message);
  }
}

// Crear un nuevo proyecto
async function createProject(projectData) {
  try {
    const newProject = await Project.create(projectData);
    return newProject;
  } catch (e) {
    throw new Error('ERROR - [createProject]: ' + e.message);
  }
}

// Obtener un proyecto por ID
async function getProjectById(id) {
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      throw new Error(`Project with id ${id} not found`);
    }
    return project;
  } catch (e) {
    throw new Error('ERROR - [getProjectById]: ' + e.message);
  }
}

// Actualizar un proyecto existente
async function updateProject(id, data) {
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      throw new Error(`Project with id ${id} not found`);
    }
    const updatedProject = await project.update(data);
    return updatedProject;
  } catch (e) {
    throw new Error('ERROR - [updateProject]: ' + e.message);
  }
}

// Eliminar un proyecto por ID
async function deleteProject(id) {
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      throw new Error(`Project with id ${id} not found`);
    }
    await project.destroy();
    return { message: `Project with id ${id} deleted successfully` };
  } catch (e) {
    throw new Error('ERROR - [deleteProject]: ' + e.message);
  }
}

module.exports = {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject
};
