import { Request, Response ,NextFunction} from 'express';
import  {Task}  from '../models/Task';
import { Category } from '../models/Category';
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

export const addCategoriesToTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const { categoryIds } = req.body;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }


    await task.addCategory(categoryIds);

    res.status(200).json({ message: 'Categories added to task successfully' });
  } catch (error) {
    console.error("Error adding categories to task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTaskCategories = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id, {
      include: Category,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const categories = await task.getCategories();

    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching task categories:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
// export const removeCategoriesFromTask = async (req: Request, res: Response) => {
//   try {
//     const taskId = req.params.id;
//     const { categoryIds } = req.body;

//     const task = await Task.findByPk(taskId);

//     if (!task) {
//       return res.status(404).json({ error: 'Task not found' });
//     }

//     // Предполагается, что у вас есть метод removeCategories
//     await task.removeCategories(categoryIds);

//     res.status(200).json({ message: 'Categories removed from task successfully' });
//   } catch (error) {
//     console.error("Error removing categories from task:", error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
export const removeCategoryFromTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const categoryId = req.params.categoryId;
    // Получаем ID категории из параметров запроса

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const categoryToRemove = await Category.findByPk(categoryId);

    if (!categoryToRemove) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Удаляем связь категории с задачей
    await task.removeCategory(categoryToRemove);

    res.status(200).json({ message: 'Category removed from task successfully' });
  } catch (error) {
    console.error("Error removing category from task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};