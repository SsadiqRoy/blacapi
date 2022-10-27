const dotenv = require('dotenv');

process.on('uncaughtException', (error) => {
  console.log(error);
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
const server = app.listen(process.env.port, process.env.host, () => console.log('blacapi server started...'));

process.on('unhandledRejection', (error) => {
  console.log(error);
  server.close(() => {
    process.exit(1);
  });
});
