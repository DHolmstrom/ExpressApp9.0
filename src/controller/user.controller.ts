import { Request, Response } from 'express';
import {
  createNewUser,
  getAllUsers,
  getUserById,
  getUserByEmailWithPassword,
  deleteUserByIdHandler,
} from '../service/user.service';
import logger from '../utils/logger';

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await createNewUser(req.body);
    res.send(user);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
};

export const getAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    res.send(users);
  } catch (error: any) {
    logger.error(error);
    res.status(404).send(error.message);
  }
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).send(user);
  } catch (error: any) {
    logger.error(error);
    res.status(400).send(error.message);
  }
};

export const signinUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailWithPassword(email);

    if (!(user && (await user.comparePassword(password)))) {
      return res.status(401).send('Invalid email or password');
    }

    return res.status(202).send({ name: user.name, email: user.email });
  } catch (error: any) {
    logger.error(error);
    return res.status(500).send(error.message);
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const user = await deleteUserByIdHandler(req.body);
    return res.status(200).send(user);
  } catch (error: any) {
    logger.error(error);
    return res.status(400);
  }
};
