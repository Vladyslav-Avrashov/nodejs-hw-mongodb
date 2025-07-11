import { initMongodbConnection } from './db/initMongodbConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongodbConnection();
  setupServer();
};

bootstrap();
