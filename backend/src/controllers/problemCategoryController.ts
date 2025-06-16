import { Request, Response } from 'express';
import { ProblemCategoryService } from '../services/problemCategoryService';

export class ProblemCategoryController {
  static async listByProblem(req: Request, res: Response) {
    const { problemId } = req.params;
    const list = await ProblemCategoryService.getByProblem(problemId);
    res.json(list);
  }

  static async create(req: Request, res: Response) {
    try {
      const pc = await ProblemCategoryService.create(req.body);
      res.status(201).json(pc);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params;
    await ProblemCategoryService.delete(id);
    res.status(204).send();
  }
}
