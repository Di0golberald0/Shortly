import { Router } from 'express';
import { signIn, signUp } from '../controllers/signController.js';
import { userMiddleware } from '../middlewares/userMiddleware.js';

const router = Router();
router.post('/signup', userMiddleware, signUp);
router.post('/signin', signIn);
export default router;