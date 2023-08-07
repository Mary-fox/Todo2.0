import { Request, Response ,NextFunction} from 'express';
import  {Task}  from '../models/Task';
import ApiError from '../error/ApiError';
// Начальные данные задач
const initialTasks = [
  { title: 'Task 1', id:1, completed: false },
  { title: 'Task 2', id:2, completed: false },
];
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    // Если база данных пуста, добавим начальные данные
    const tasks = await Task.findAll();
    if (tasks.length === 0) {
      await Task.bulkCreate(initialTasks);
    }

    // Теперь получаем все задачи из базы данных и отправляем клиенту
    const updatedTasks = await Task.findAll();
    res.json(updatedTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { title, completed } = req.body;
  try {
    const task = await Task.create({ title, completed });
    res.status(201).json({ id: task.id, title, completed });
  } catch (error) {
    next(ApiError.badRequest('Error creating task'));
  }
};

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (task) {
      res.status(200).json(task);
    } else {
      next(ApiError.badRequest('Task not found'));
    }
  } catch (error) {
    next(ApiError.badRequest('Error fetching task'));
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title,  completed, categoryId } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (task) {
      task.title = title;
      task.completed = completed;
      // task.categoryId = categoryId; // Обновляем categoryId, если передано
      await task.save();
      res.status(200).json(task);
    } else {
      next(ApiError.badRequest('Task not found'));
    }
  } catch (error) {
    next(ApiError.badRequest('Error updating task'));
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (task) {
      await task.destroy();
      res.sendStatus(204);
    } else {
      next(ApiError.badRequest('Task not found'));
    }
  } catch (error) {
    error instanceof Error && next(ApiError.badRequest(error.message));
  }
};
