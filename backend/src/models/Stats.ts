import { Schema } from 'mongoose';
import { ISkill, SkillSchema } from './Skills';
export interface IStats {
    _id?: never;
    total_solved: number,
    skills: ISkill[]
}
export const StatsSchema = new Schema<IStats>({
    total_solved: {
        type: Number,
        required: true
    },
    skills: {
        type: [SkillSchema],
        required: true
    }
}, {
    _id: false
})

