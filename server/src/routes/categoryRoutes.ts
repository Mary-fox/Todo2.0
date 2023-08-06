import express from 'express';
import {
  getAllCategories,
  createCategory,
  seedCategories,
} from '../controllers/categoryController';

const router = express.Router();

router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.get('/seed-categories', seedCategories);

export default router;