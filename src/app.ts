import express from 'express';
import config from 'config';
import session from 'express-session';
import expressLayouts from 'express-ejs-layouts';

import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';

import { UserDocument } from './models/user.model';

declare module 'express-session' {
  interface SessionData {
    user: any | undefined;
  }
}

const port = config.get<number>('port');

const app = express();

app.use(express.json());

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/', express.static(__dirname + '/../public'));
app.set('views', __dirname + '/views');

const oneDay = 1000 * 60 * 60 * 24;
const sessionSecret = config.get<string>('sessionSecret');
app.use(
  session({
    secret: sessionSecret,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.listen(port, async () => {
  logger.info(`App is runging att http://localhost:${port}`);

  await connect();

  routes(app);
});
