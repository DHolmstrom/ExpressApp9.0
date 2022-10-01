import { Request, Response } from 'express';
import {
  createNewUser,
  getAllUsers,
  getUserById,
  getUserByIdWithPassword,
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
