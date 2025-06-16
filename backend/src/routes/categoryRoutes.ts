import { Router } from 'express';
import { CategoryController } from '../controllers/categoryController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', CategoryController.list);

router.post('/', authenticate, authorize('admin'), CategoryController.create);
router.put('/:id', authenticate, authorize('admin'), CategoryController.update);
router.delete('/:id', authenticate, authorize('admin'), CategoryController.remove);

export default router;
