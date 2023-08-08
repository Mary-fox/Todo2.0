import { Model, DataTypes, Association } from 'sequelize';
import { sequelize } from '../config/database';

export interface TaskAttributes {
  id?: number;
  title: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

class Task extends Model<TaskAttributes> {
  id!: number;
  title!: string;
  completed!: boolean;
  
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly deletedAt!: Date;

}


Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'Tasks',
  },
);

export { Task };
