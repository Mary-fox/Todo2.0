import { Model, DataTypes, BelongsToManyAddAssociationMixin , HasManyGetAssociationsMixin, BelongsToManyRemoveAssociationMixin } from 'sequelize';
import { sequelize } from '../config/database';
import { Category } from './Category';

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

  //добавление связи (категории) к задаче
  public addCategory!: BelongsToManyAddAssociationMixin<Category, number>;
  //получение связанных записей (категорий) для задачи
  public getCategories!: HasManyGetAssociationsMixin<Category>;
  public removeCategory!: BelongsToManyRemoveAssociationMixin<Category, number>;
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

Task.belongsToMany(Category, { through: 'TaskCategories' });
Category.belongsToMany(Task, { through: 'TaskCategories' });

export { Task };
