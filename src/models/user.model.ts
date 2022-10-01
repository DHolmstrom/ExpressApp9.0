import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

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

userSchema.methods.comparePassword = async (inputPassword: string) => {
  let user = this as unknown as UserDocument;

  return bcrypt.compareSync(inputPassword, user.password);
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
