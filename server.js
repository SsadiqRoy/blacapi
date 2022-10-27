const fs = require('fs');
// const { promisify } = require('util');
const dotenv = require('dotenv');

process.on('uncaughtException', async (error) => {
  console.log(error);
  error.date = new Date().toISOString();
  error.type = 'uncaughtException';

  fs.appendFile('./errors/error.log', `\n \n ${JSON.stringify(error)}`, 'utf-8', (e) => {
    if (e) {
      console.log(e);
    }
  });
  process.exit(1);
});

dotenv.config({ path: './config.env' });

// connecting to the database
const sequelize = require('./db');
async function connectDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // sequelize.sync({ alter: true });
    console.log('🎁🎁 blacapi db connected....');
  } catch (error) {
    error.date = new Date().toISOString();
    error.type = 'creating server';

    fs.appendFile('./errors/error.log', `\n \n ${JSON.stringify(error)}`, 'utf-8', (e) => {
      if (e) console.log(e);
    });

    console.log('DB_CONNECTION🔥', error);
  }
}
connectDB();

// running the app
const app = require('./app');

console.log('about to start app');
// creating server for the app
const server = app.listen(process.env.port, process.env.host, async (error) => {
  if (error) {
    error.date = new Date().toISOString();
    error.type = 'creating server';

    fs.appendFile('./errors/error.log', `\n \n ${JSON.stringify(error)}`, 'utf-8', (e) => {
      if (e) console.log(e);
    });
  }
  console.log('blacapi server started...');
});
console.log('app successfully started');

process.on('unhandledRejection', (error) => {
  console.log(error);
  server.close(async () => {
    error.date = new Date().toISOString();
    error.type = 'unhandledRejection';

    fs.appendFile('./errors/error.log', `\n \n ${JSON.stringify(error)}`, 'utf-8', (e) => {
      if (e) console.log(e);
    });

    process.exit(1);
  });
});
