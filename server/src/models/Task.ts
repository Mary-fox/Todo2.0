// import { DataTypes, Model, Optional } from 'sequelize';
// import sequelize from '../config/database';

// // Определение атрибутов для задачи
// interface TaskAttributes {
//   id: number;
//   title: string;
//   completed: boolean;
//   categoryId?: number; // categoryId является опциональным
// }

// // Опциональные атрибуты для создания задачи
// interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

// // Определение модели для задачи
// class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
//   public id!: number;
//   public title!: string;
//   public completed!: boolean;
//   public categoryId?: number; // categoryId является опциональным
// }

// // Инициализация модели с атрибутами и настройками
// Task.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     completed: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//     categoryId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'categories',
//         key: 'id',
//       },
//     },
//   },
//   {
//     sequelize,
//     modelName: 'Task',
//   }
// );

// export default Task;



import { Model, DataTypes } from 'sequelize';
import  sequelize  from '../config/database';

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