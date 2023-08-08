import { Router } from 'express';
import taskRouter from './taskRouter';
import categoryRoutes from './categoryRoutes'


const router = Router();

router.use('/tasks', taskRouter);

router.use('/categories', categoryRoutes);

export default router;