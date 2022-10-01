import mongoose from 'mongoose';
import config from 'config';

import logger from './logger';

const connect = async () => {
  const dbUri = config.get<string>('dbUri');

  try {
    mongoose.connect(dbUri, {});
    logger.info('Connected to database');
  } catch (error) {
    logger.info('Failed to connect to database');
    logger.error(error);
    process.exit(1);
  }
};

export default connect;
