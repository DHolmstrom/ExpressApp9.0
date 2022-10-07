import express from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  signinUserHandler,
  deleteUserById,
} from '../controller/user.controller';
import { createUserSchema } from '../schema/user.schema';
import validate from '../middleware/validateResource';

const router = express.Router();

router.get('/', getAllUsersHandler);

router.post('/', validate(createUserSchema), createUserHandler);

router.get('/:id', getUserByIdHandler);

//TODO: Update user

router.post('/id', deleteUserById);

router.post('/signin', signinUserHandler);

//router.post('/signup', signupUserHandler)

export default router;
