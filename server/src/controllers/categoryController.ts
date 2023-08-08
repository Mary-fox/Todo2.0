import { Request, Response, NextFunction } from 'express';
import { Category } from '../models/Category';
import ApiError from '../error/ApiError';

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

