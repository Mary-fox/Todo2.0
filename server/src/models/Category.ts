import { Model, DataTypes, FindOrCreateOptions } from 'sequelize';
import { sequelize } from '../config/database';

export interface CategoryAttributes {
  id?: number;
  name: string;
  color: string;
}

class Category extends Model<CategoryAttributes> {
  public id!: number;
  public name!: string;
  public color!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static async initializeDefaultCategories() {
    const defaultCategoriesData: Omit<CategoryAttributes, 'id'>[] = [
      { name: 'Важное', color: 'red' },
      { name: 'Для дома', color: 'green' },
      { name: 'Для работы', color: 'blue' },
      { name: 'Задачи на неделю', color: 'blue' },
    ];

    try {
      for (const categoryData of defaultCategoriesData) {
        const options: FindOrCreateOptions<CategoryAttributes> = {
          where: { name: categoryData.name },
          defaults: categoryData,
        };

        await Category.findOrCreate(options);
      }
    } catch (error) {
      console.error('Error initializing default categories:', error);
    }
  }
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'Category',
    tableName: 'Categories',
    sequelize,
  }
);

export { Category };