import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ISummary extends Document {
  _id: string;
  userId: string;
  problemId: string;
  summaryText: string;
  createdAt: Date;
  updatedAt: Date;
}

const SummarySchema = new Schema<ISummary>(
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
    summaryText: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    _id: false
  }
);

export const Summary = model<ISummary>('Summary', SummarySchema);
