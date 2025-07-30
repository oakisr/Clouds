import { Router } from 'express';
import { authController, userController } from './controllers';

const authRouter = Router();
authRouter.post('/register', authController.registerUser);
// authRouter.post('/login', authController.loginUser);
authRouter.delete('/:id', authController.removeUser);

const userRouter = Router();
userRouter.get('/:id', userController.get);

export { authRouter, userRouter };