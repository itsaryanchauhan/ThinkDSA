import { ProblemCategory, IProblemCategory } from '../models/ProblemCategoryModel';

export class ProblemCategoryService {
  static async getByProblem(
    problemId: string
  ): Promise<IProblemCategory[]> {
    return ProblemCategory.find({ problemId });
  }

  static async create(
    data: Partial<IProblemCategory>
  ): Promise<IProblemCategory> {
    const pc = new ProblemCategory(data);
    return pc.save();
  }

  static async delete(id: string): Promise<void> {
    await ProblemCategory.findByIdAndDelete(id);
  }
}
