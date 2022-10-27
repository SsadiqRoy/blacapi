const fs = require('fs');
const { promisify } = require('util');
const dotenv = require('dotenv');

process.on('uncaughtException', async (error) => {
  console.log(error);
  const errors = JSON.parse(await promisify(fs.readFile)(`./errors/error.json`));
  error.date = new Date().toISOString();
  error.type = 'uncaughtException';
  errors.push(error);

  fs.writeFile('./errors/error.json', JSON.stringify(errors), (e) => {
    if (e) console.log(e);
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
    // if (error) {
    // }
    const errors = JSON.parse(await promisify(fs.readFile)(`./errors/error.json`));
    error.date = new Date().toISOString();
    console.log(errors);
    error.type = 'creating server';
    errors.push(error);
    if (errors.length) {
      fs.writeFile('./errors/error.json', JSON.stringify(errors), (e) => {
        if (e) console.log(e);
      });
    }
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
    const errors = JSON.parse(await promisify(fs.readFile)(`./errors/error.json`));
    error.date = new Date().toISOString();
    error.type = 'creating server';
    errors.push(error);
    if (errors.length) {
      fs.writeFile('./errors/error.json', JSON.stringify(errors), (e) => {
        if (e) console.log(e);
      });
    }
  }
  console.log('blacapi server started...');
});
console.log('app successfully started');

process.on('unhandledRejection', (error) => {
  console.log(error);
  server.close(async () => {
    const errors = JSON.parse(await promisify(fs.readFile)(`./errors/error.json`));
    error.date = new Date().toISOString();
    error.type = 'unhandledRejection';
    errors.push(error);

    if (errors.length) {
      fs.writeFile('./errors/error.json', JSON.stringify(errors), (e) => {
        if (e) console.log(e);
      });
    }

    process.exit(1);
  });
});
