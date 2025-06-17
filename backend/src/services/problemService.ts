import { Problem, IProblem } from '../models/ProblemModel';

export class ProblemService {
  static async getAll(): Promise<IProblem[]> {
    return Problem.find().sort({ createdAt: -1 });
  }

  static async getById(id: string): Promise<IProblem | null> {
    const problem = await Problem.findById(id);
    if (problem) {
      problem.viewCount += 1;
      await problem.save();
    }
    return problem;
  }

  static async create(data: Partial<IProblem>): Promise<IProblem> {
    const problem = new Problem(data);
    return problem.save();
  }

  static async update(
    id: string,
    data: Partial<IProblem>
  ): Promise<IProblem | null> {
    return Problem.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id: string): Promise<void> {
    await Problem.findByIdAndDelete(id);
  }
}
