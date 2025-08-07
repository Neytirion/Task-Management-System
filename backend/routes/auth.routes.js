import express from 'express';
import { signUp, login , verifyEmail} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

router.post('/verify-email', verifyEmail)

export default router;
