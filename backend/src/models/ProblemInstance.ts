import {Schema} from "mongoose"

export interface IProblemInstance {
    _id?: never;
    problem_id: string;
    solution_id: string;
}
export const ProblemInstanceSchema = new Schema<IProblemInstance>({
    problem_id: {
        type: String,
        ref: "Problem",
        required: true
    },
    solution_id: {
        type: String,
        ref: 'Solution',
        required: true
    }
}, {
    _id: false
})