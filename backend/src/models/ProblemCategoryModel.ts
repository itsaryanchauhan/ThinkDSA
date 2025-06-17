import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IProblemCategory extends Document {
  _id: string;
  problemId: string;
  categoryId: string;
}

const ProblemCategorySchema = new Schema<IProblemCategory>(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    problemId: {
      type: String,
      ref: 'Problem',
      required: true
    },
    categoryId: {
      type: String,
      ref: 'Category',
      required: true
    }
  },
  {
    _id: false
  }
);

export const ProblemCategory = model<IProblemCategory>(
  'ProblemCategory',
  ProblemCategorySchema
);
