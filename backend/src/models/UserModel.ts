import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IStats, StatsSchema } from './Stats';
export type UserRole = 'user' | 'admin';

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  passwordHash: string;
  profileBio?: string;
  role: UserRole;
  stats: IStats;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    profileBio: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    stats: {
      type: StatsSchema,
      required: true
    }
  },
  {
    timestamps: true,
    _id: false
  }
);

export const User = model<IUser>('User', UserSchema);
