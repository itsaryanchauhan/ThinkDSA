import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ISolution extends Document {
  _id: string;
  userId: string;
  problemId: string;
  approach: string;
  code: string;
  submissionTimestamp: Date;
  viewCount: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const SolutionSchema = new Schema<ISolution>(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    userId: {
      type: String,
      ref: 'User',
      required: true
    },
    problemId: {
      type: String,
      ref: 'Problem',
      required: true
    },
    approach: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    submissionTimestamp: {
      type: Date,
      required: true,
      default: () => new Date()
    },
    viewCount: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    _id: false
  }
);

export const Solution = model<ISolution>('Solution', SolutionSchema);
