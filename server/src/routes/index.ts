import { Router } from 'express';
import taskRouter from './taskRouter';

const router = Router();

router.use('/tasks', taskRouter);

export default router;