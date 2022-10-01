import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

import logger from '../utils/logger';

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(inputPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requierd: true,
    },
    email: {
      type: String,
      requierd: true,
      unique: true,
    },
    password: {
      type: String,
      requierd: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  let user = this as unknown as UserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const saltRounds = config.get<number>('saltRounds');

  const hash = await bcrypt.hash(user.password, saltRounds);

  user.password = hash;

  return next();
});

userSchema.method(
  'comparePassword',
  async function comparePassword(inputPassword: string): Promise<boolean> {
    logger.info(this._doc);
    return await bcrypt.compare(inputPassword, this._doc.password);
  }
);

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
