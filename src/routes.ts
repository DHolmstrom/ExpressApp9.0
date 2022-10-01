import { Express, Request, Response } from 'express';
import albumAPIRouter from './routes/album.api';
import userAPIRouter from './routes/user.api';

const routes = (app: Express) => {
  app.get('/test', (req: Request, res: Response) => {
    res.status(200).send('App works fine');
  });

  app.use('/api/albums', albumAPIRouter);

  app.use('/api/users', userAPIRouter);
};

export default routes;
