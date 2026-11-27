import type { Server } from 'node:http';
import app from './app';
import config from './app/config';
import seedSuperAdminInToDB from './app/DB';

let server: Server;

const main = async () => {
  try {
    await seedSuperAdminInToDB();
    server = app.listen(config.port, () => {
      console.log(`Product Review Portal App listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();

process.on('unhandledRejection', () => {
  console.log('Unhandled Rejection is Detected, Shutting Down...');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('Uncaught Exception is Detected, Shutting Down...');

  process.exit(1);
});
