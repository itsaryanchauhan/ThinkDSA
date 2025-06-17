import { Solution, ISolution } from '../models/SolutionModel';

export class SolutionService {
  static async getByProblem(
    problemId: string
  ): Promise<ISolution[]> {
    return Solution.find({ problemId }).sort({ createdAt: -1 });
  }

  static async create(data: Partial<ISolution>): Promise<ISolution> {
    const sol = new Solution(data);
    return sol.save();
  }

  static async update(
    id: string,
    userId: string,
    data: Partial<ISolution>
  ): Promise<ISolution | null> {
    // only owner can update
    return Solution.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true }
    );
  }

  static async delete(
    id: string,
    userId: string
  ): Promise<void> {
    await Solution.findOneAndDelete({ _id: id, userId });
  }
}
