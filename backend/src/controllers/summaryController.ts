import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { SummaryService } from '../services/summaryService';

export class SummaryController {
  static async listByProblem(req: AuthRequest, res: Response) {
    const { problemId } = req.params;
    const items = await SummaryService.getByProblem(problemId);
    res.json(items);
  }

  static async create(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.sub;
      const data = { ...req.body, userId };
      const s = await SummaryService.create(data);
      res.status(201).json(s);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    const userId = req.user!.sub;
    const { id } = req.params;
    const updated = await SummaryService.update(
      id,
      userId,
      req.body
    );
    if (!updated) {
      res.status(404).json({ message: 'Not found or not yours' });
      return;
    }
    res.json(updated);
  }

  static async remove(req: AuthRequest, res: Response) {
    const userId = req.user!.sub;
    const { id } = req.params;
    await SummaryService.delete(id, userId);
    res.status(204).send();
  }
}
