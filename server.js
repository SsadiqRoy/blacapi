const fs = require('fs');
const { promisify } = require('util');
const dotenv = require('dotenv');

process.on('uncaughtException', async (error) => {
  console.log(error);
  const errors = JSON.parse(await promisify(fs.readFile)(`./errors/error.js`));
  error.date = date.now();
  error.type = 'uncaughtException';
  error.push(error);

  fs.writeFile('./errors/error.json', JSON.stringify(errors));
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
    console.log('DB_CONNECTION🔥', error);
  }
}
connectDB();

// running the app
const app = require('./app');

// creating server for the app
const server = app.listen(process.env.port, process.env.host, async (error) => {
  if (error) {
    const errors = JSON.parse(await promisify(fs.readFile)(`./errors/error.js`));
    error.date = date.now();
    error.type = 'creating server';
    error.push(error);
  }
  console.log('blacapi server started...');
});

process.on('unhandledRejection', (error) => {
  console.log(error);
  server.close(async () => {
    const errors = JSON.parse(await promisify(fs.readFile)(`./errors/error.js`));
    error.date = date.now();
    error.type = 'unhandledRejection';
    error.push(error);

    fs.writeFile('./errors/error.json', JSON.stringify(errors));
    process.exit(1);
  });
});
