import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class TaskCategory extends Model {
  public taskId!: number;
  public categoryId!: number;
}

TaskCategory.init(
  {
    taskId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'tasks',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'TaskCategory',
    tableName: 'task_categories',
    timestamps: false,
  }
);

export default TaskCategory;