import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface TaskCategoryAttributes {
  id: number;
  taskId: number;
  categoryId: number;
}

class TaskCategory extends Model<TaskCategoryAttributes> {
  public id!: number;
  public taskId!: number;
  public categoryId!: number;
}

TaskCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'TaskCategories',
    sequelize,
  }
);

export { TaskCategory };