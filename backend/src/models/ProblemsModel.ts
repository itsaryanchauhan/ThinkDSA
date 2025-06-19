import {Schema, Document, model} from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export type Difficulty = "easy"|"medium" | "hard";

export interface IProblem extends Document {
    _id: string;
    title: string;
    statement: string;
    constraints: string;
    difficulty: Difficulty;
    topic_ids: string[];
    tags: string[]
}
export const ProblemsSchema = new Schema<IProblem> ({
    _id: {
      type: String,
      default: uuidv4
    },
    title: {
        type: String,
        required: true
    },
    statement: {
        type: String,
        required: true
    },
    constraints: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ["easy", "medium", "hard"]
    },
    topic_ids: [{
        type: String,
        ref: 'Topic',
        required: true
    }],
    tags: {
        type: [String],
        required: true
    }
});

export const Problem = model<IProblem>('Problem', ProblemsSchema);