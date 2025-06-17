import { Summary, ISummary } from '../models/SummaryModel';

export class SummaryService {
  static async getByProblem(
    problemId: string
  ): Promise<ISummary[]> {
    return Summary.find({ problemId }).sort({ createdAt: -1 });
  }

  static async create(data: Partial<ISummary>): Promise<ISummary> {
    const s = new Summary(data);
    return s.save();
  }

  static async update(
    id: string,
    userId: string,
    data: Partial<ISummary>
  ): Promise<ISummary | null> {
    return Summary.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true }
    );
  }

  static async delete(
    id: string,
    userId: string
  ): Promise<void> {
    await Summary.findOneAndDelete({ _id: id, userId });
  }
}
