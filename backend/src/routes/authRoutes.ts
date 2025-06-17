import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();

/**
 * @route POST /api/auth/register
 * @body { username, email, password }
 */
router.post('/register', AuthController.register);

/**
 * @route POST /api/auth/login
 * @body { email, password }
 */
router.post('/login', AuthController.login);

export default router;
