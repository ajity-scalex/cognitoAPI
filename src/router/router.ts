import {Router} from 'express';
import authMiddleware from '../middleware/auth.middleware';
import userController from '../user.controller';

const router = Router();

router.post('/signup', userController.signUp);

router.post('/signup/confirm', userController.confirmSignUp);

router.post('/signin', userController.signIn);

router.get('/profile', authMiddleware, userController.getProfile);


export default router;