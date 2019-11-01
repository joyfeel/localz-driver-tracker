import { Router } from 'express';
import { signup, login, logout } from './auth';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;
