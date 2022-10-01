import { DocumentDefinition, ObjectId } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';

export const getAllUsers = async () => {
  try {
    return await UserModel.find();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createNewUser = async (
  input: DocumentDefinition<UserDocument>
) => {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserById = async (id: string | ObjectId) => {
  try {
    return await UserModel.findById(id);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserByIdWithPassword = async (id: string | ObjectId) => {
  try {
    return await UserModel.findById(id).select('+password');
  } catch (error: any) {
    throw new Error(error);
  }
};
