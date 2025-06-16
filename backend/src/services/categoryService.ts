import { Category, ICategory } from '../models/CategoryModel';

export class CategoryService {
  static async getAll(): Promise<ICategory[]> {
    return Category.find().sort({ name: 1 });
  }

  static async create(data: Partial<ICategory>): Promise<ICategory> {
    const c = new Category(data);
    return c.save();
  }

  static async update(
    id: string,
    data: Partial<ICategory>
  ): Promise<ICategory | null> {
    return Category.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id: string): Promise<void> {
    await Category.findByIdAndDelete(id);
  }
}
