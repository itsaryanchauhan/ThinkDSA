import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { User, IUser } from '../models/UserModel';

export class AuthService {
  static async register(
    username: string,
    email: string,
    password: string
  ): Promise<IUser> {
    const existing = await User.findOne({ email });
    if (existing) {
      throw new Error('Email already in use');
    }
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS!, 10);
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, email, passwordHash });
    return user.save();
  }

  static async login(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {
    // 1️⃣ Look up the user
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    // 2️⃣ Compare password
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('Invalid credentials');

    // 3️⃣ Pull env vars into guaranteed non‑undefined locals
    const jwtSecret: string = process.env.JWT_SECRET!;
    const jwtExpiresIn: string = process.env.JWT_EXPIRES_IN || '1d'; 
    // ⬆︎ you can default here or throw earlier if you want it mandatory

    // 4️⃣ Build your payload
    const payload = { sub: user._id, role: user.role };

    // 5️⃣ Create a SignOptions object so TS sees the right overload
    const signOptions: SignOptions = {
      expiresIn: jwtExpiresIn as jwt.SignOptions['expiresIn'],
    };

    // 6️⃣ Now the compiler knows you’re calling jwt.sign(payload, string, SignOptions)
    const token = jwt.sign(payload, jwtSecret, signOptions);

    return { user, token };
  }
}
