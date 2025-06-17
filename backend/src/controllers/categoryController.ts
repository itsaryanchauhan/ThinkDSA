import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';

export class CategoryController {
  static async list(req: Request, res: Response) {
    const cats = await CategoryService.getAll();
    res.json(cats);
  }

  static async create(req: Request, res: Response) {
    try {
      const cat = await CategoryService.create(req.body);
      res.status(201).json(cat);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const updated = await CategoryService.update(id, req.body);
    if (!updated) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(updated);
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params;
    await CategoryService.delete(id);
    res.status(204).send();
  }
}
