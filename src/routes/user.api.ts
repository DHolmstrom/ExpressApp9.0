import express from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  signinUserHandler,
} from '../controller/user.controller';
import { createUserSchema } from '../schema/user.schema';
import validate from '../middleware/validateResource';

const router = express.Router();

router.get('/', getAllUsersHandler);

router.post('/', validate(createUserSchema), createUserHandler);

router.get('/:id', getUserByIdHandler);

//TODO: Update user

//TODO: Delete user

router.post('/signin', signinUserHandler);

//router.post('/signup', signupUserHandler)

export default router;
