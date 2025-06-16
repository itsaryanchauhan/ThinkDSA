import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { SolutionService } from '../services/solutionService';

export class SolutionController {
  static async listByProblem(req: AuthRequest, res: Response) {
    const { problemId } = req.params;
    const sols = await SolutionService.getByProblem(problemId);
    res.json(sols);
  }

  static async create(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.sub;
      const data = { ...req.body, userId };
      const sol = await SolutionService.create(data);
      res.status(201).json(sol);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    const userId = req.user!.sub;
    const { id } = req.params;
    const updated = await SolutionService.update(
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
    await SolutionService.delete(id, userId);
    res.status(204).send();
  }
}
