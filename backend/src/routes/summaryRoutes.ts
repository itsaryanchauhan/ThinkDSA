import { Router } from 'express';
import { SummaryController } from '../controllers/summaryController';
import { authenticate } from '../middleware/auth';

const router = Router({ mergeParams: true });

router.get('/', SummaryController.listByProblem);

router.post('/', authenticate, SummaryController.create);
router.put('/:id', authenticate, SummaryController.update);
router.delete('/:id', authenticate, SummaryController.remove);

export default router;
