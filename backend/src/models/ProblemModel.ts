import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface IProblem extends Document {
  _id: string;
  title: string;
  description: string;
  difficultyLevel: DifficultyLevel;
  viewCount: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProblemSchema = new Schema<IProblem>(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    difficultyLevel: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'easy'
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

export const Problem = model<IProblem>('Problem', ProblemSchema);
