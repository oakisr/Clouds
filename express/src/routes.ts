import { Router } from 'express';
import { authController, userController } from './controllers';

const authRouter = Router();
// authRouter.post('/register', authController.registerUser);

const userRouter = Router();
userRouter.get('/:id', userController.get);

export { authRouter, userRouter };