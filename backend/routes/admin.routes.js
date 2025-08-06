import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { requireAdmin } from '../middlewares/admin.middleware.js';
import { getAllUsersWithTasks, deleteUser } from '../controllers/admin.controller.js';

const router = express.Router();

router.use(authenticateToken);
router.use(requireAdmin);

router.get('/users', getAllUsersWithTasks);
router.delete('/users/:id', deleteUser);

export default router;
