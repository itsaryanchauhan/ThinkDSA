import {Schema } from "mongoose"
import { IProblemInstance, ProblemInstanceSchema } from "./ProblemInstance"
export interface ISkill {
    _id?: never;
    topic_id: string;
    solved: IProblemInstance[];
    weight: number;
}
export const SkillSchema = new Schema<ISkill>({
    topic_id: {
        type: String,
        ref: 'Topic',
        required: true
    },
    solved: {
        type: [ProblemInstanceSchema],
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
}, {
    _id: false
})