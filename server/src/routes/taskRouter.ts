import {Router} from 'express';
import {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController';

const taskRouter = Router();

taskRouter.get('/', getAllTasks);
taskRouter.post('/', createTask);
taskRouter.get('/:id', getTaskById);
taskRouter.put('/:id', updateTask);
taskRouter.delete('/:id', deleteTask);

export default taskRouter;