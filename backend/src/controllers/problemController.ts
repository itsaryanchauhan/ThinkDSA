import { Request, Response } from 'express';
import { ProblemService } from '../services/problemService';

export class ProblemController {
  static async list(req: Request, res: Response) {
    const problems = await ProblemService.getAll();
    res.json(problems);
  }

  static async detail(req: Request, res: Response) {
    const { id } = req.params;
    const problem = await ProblemService.getById(id);
    if (!problem) {
      res.status(404).json({ message: 'Problem not found' });
      return;
    }
    res.json(problem);
  }

  static async create(req: Request, res: Response) {
    try {
      const problem = await ProblemService.create(req.body);
      res.status(201).json(problem);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const updated = await ProblemService.update(id, req.body);
    if (!updated) {
      res.status(404).json({ message: 'Problem not found' });
      return;
    }
    res.json(updated);
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params;
    await ProblemService.delete(id);
    res.status(204).send();
  }
}
