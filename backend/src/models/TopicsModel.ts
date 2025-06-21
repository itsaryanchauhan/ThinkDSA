import { Schema, model, Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
export interface ITopic extends Document {
    _id: string,
    name: string,
    description: string
}
export const TopicSchema = new Schema<ITopic>({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
export const Topic = model<ITopic>("Topic", TopicSchema);