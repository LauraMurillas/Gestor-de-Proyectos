const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  taskDescription: {
    type: DataTypes.TEXT,
  },
  limitDateTask: {
    type: DataTypes.DATE,
  },
  complete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Project,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
});

Task.belongsTo(Project, { foreignKey: 'projectId' });
Project.hasMany(Task, { foreignKey: 'projectId' });

module.exports = Task;
