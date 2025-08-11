import express from 'express';
import { signUp, login, logout, getMe } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { signUpSchema, loginSchema } from '../validators/auth.validator.js';

const router = express.Router();

router.post('/signup', validate(signUpSchema), signUp);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);
router.get('/me', getMe);

export default router;
