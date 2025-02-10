import { Router } from 'express';
import * as users from '../controllers/users';

const router = Router();

router.get('/', users.newUser);
router.get('/test', users.testUser);

export default router;
