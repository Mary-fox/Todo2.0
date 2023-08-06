import { Request, Response } from 'express';
import  Category  from '../models/Category';

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name, color } = req.body;
  try {
    const category = await Category.create({ name, color });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
};

export const seedCategories = async (_req: Request, res: Response) => {
  try {
    const categories = [
      { name: 'Work', color: '#FF5733' },
      { name: 'Personal', color: '#33FF57' },
      { name: 'Family', color: '#5733FF' },
    ];
    await Category.bulkCreate(categories);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Error seeding categories' });
  }
};