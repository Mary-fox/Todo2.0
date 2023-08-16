import {Router} from 'express';
import {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  addCategoryToTask,
  getTaskCategories,
  removeCategoryFromTask,
} from '../controllers/taskController';

const router = Router();

router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post("/:id/categories/:categoryId", addCategoryToTask); // Добавление категорий к задаче
router.get("/:id/categories", getTaskCategories);
router.delete("/:id/categories/:categoryId", removeCategoryFromTask);



export default router;