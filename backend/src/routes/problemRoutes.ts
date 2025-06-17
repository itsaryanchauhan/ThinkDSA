import { Router } from 'express';
import { ProblemController } from '../controllers/problemController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', ProblemController.list);
router.get('/:id', ProblemController.detail);

router.post('/', authenticate, authorize('admin'), ProblemController.create);
router.put('/:id', authenticate, authorize('admin'), ProblemController.update);
router.delete('/:id', authenticate, authorize('admin'), ProblemController.remove);

export default router;
