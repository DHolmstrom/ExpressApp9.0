import { Express, Request, Response } from 'express';
import albumAPIRouter from './routes/album.api';
import userAPIRouter from './routes/user.api';

const routes = (app: Express) => {
  app.get('/api/test', (req: Request, res: Response) => {
    res.status(200).send('App works fine');
  });

  app.get('/', (req: Request, res: Response) => {
    res.render('pages/index');
  });

  app.get('/albums', (req: Request, res: Response) => {
    res.render('pages/albums');
  });

  app.get('/albums', (req: Request, res: Response) => {
    res.render('pages/images');
  });

  app.use('/api/albums', albumAPIRouter);

  app.use('/api/users', userAPIRouter);
};

export default routes;
