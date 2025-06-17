import { Router } from 'express';
import { ProblemCategoryController } from '../controllers/problemCategoryController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router({ mergeParams: true });

// List & manage categories for a specific problem
router.get('/', ProblemCategoryController.listByProblem);
router.post('/', authenticate, authorize('admin'), ProblemCategoryController.create);
router.delete('/:id', authenticate, authorize('admin'), ProblemCategoryController.remove);

export default router;
