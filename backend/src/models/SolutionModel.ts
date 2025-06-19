import { Schema, model, Document} from "mongoose";
import { v4 as uuidv4 } from 'uuid';
export interface ISolution extends Document {
    _id: string;
    approach: string[];
    verdict: string;
}
export const SolutionSchema = new Schema<ISolution> ({
    _id: {
        type: String,
        default: uuidv4
    },
    approach: {
        type: [String],
        default: []
    },
    verdict: {
        type: String,
        required: true
    }
})
export const Solution = model<ISolution>("Solution",SolutionSchema);