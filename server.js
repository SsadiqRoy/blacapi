const dotenv = require("dotenv");

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const { host, port, db_name, db_user, db_password } = process.env;
console.log(db_user, db_name, db_password, host);

// connecting to the database
const sequelize = require("./db");
async function connectDB() {
  try {
    await sequelize.authenticate();
    // await sequelize.sync();
    sequelize.sync({ alter: true });
    console.log("connection successfull");
  } catch (error) {
    console.log("DB_CONNECTION🔥", error);
  }
}
connectDB();

// running the app
const app = require("./app");

// creating server for the app
const server = app.listen(process.env.port, process.env.host, () =>
  console.log("we are listenning...")
);

process.on("unhandledRejection", (error) => {
  console.log(error);
  server.close(() => {
    process.exit(1);
  });
});
