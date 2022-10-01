import { Express, Request, Response } from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
} from './controller/user.controller';

import { createUserSchema } from './schema/user.schema';
import validate from './middleware/validateResource';
import {
  createAlbumHandler,
  getAllAlbumsHandler,
  getAlbumByIdHandler,
} from './controller/album.controller';
import { createAlbumSchema } from './schema/album.schema';

const routes = (app: Express) => {
  app.get('/api/test', (req: Request, res: Response) => {
    res.status(200).send('App works fine');
  });

  app.get('/api/users', getAllUsersHandler);

  app.post('/api/users', validate(createUserSchema), createUserHandler);

  app.get('/api/users/:id', getUserByIdHandler);

  app.get('/api/albums', getAllAlbumsHandler);

  app.post('/api/albums', validate(createAlbumSchema), createAlbumHandler);

  app.get('/api/albums/:id', getAlbumByIdHandler);
};

export default routes;
