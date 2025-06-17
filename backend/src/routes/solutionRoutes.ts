import { Router } from 'express';
import { SolutionController } from '../controllers/solutionController';
import { authenticate } from '../middleware/auth';

const router = Router({ mergeParams: true });

router.get('/', SolutionController.listByProblem);

router.post('/', authenticate, SolutionController.create);
router.put('/:id', authenticate, SolutionController.update);
router.delete('/:id', authenticate, SolutionController.remove);

export default router;
