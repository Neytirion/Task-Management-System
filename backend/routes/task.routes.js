import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller.js';

const router = express.Router();

router.use(authenticateToken); // все маршруты защищены

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
