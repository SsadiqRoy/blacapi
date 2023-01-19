const fs = require("fs");
// const { promisify } = require('util');
const dotenv = require("dotenv");

process.on("uncaughtException", async (error) => {
  console.log(error);
  error.date = new Date().toISOString();
  error.type = "uncaughtException";

  fs.appendFile(
    "./errors/error.log",
    `\n \n ${JSON.stringify(error)}`,
    "utf-8",
    (e) => {
      if (e) {
        console.log(e);
      }
    }
  );

  process.exit(1);
});

dotenv.config({ path: "./config.env" });

// connecting to the database
const sequelize = require("./db");
async function connectDB() {
  try {
    await sequelize.authenticate();
    // await sequelize.sync();
    sequelize.sync({ alter: true });
    console.log("🎁🎁 blacapi db connected....");
    // new LogToFile('Database connection successful');
  } catch (error) {
    new WriteError(error, {}, "DB_CONN");

    console.log("DB_CONNECTION🔥", error);
  }
}
connectDB();

//

// running the app
const app = require("./app");
const { WriteError, LogToFile } = require("./errors/writeError");

console.log("about to start app");
// creating server for the app
const server = app.listen(process.env.port, process.env.host, async (error) => {
  if (error) {
    new WriteError(error, {}, "CREATING_SERVER");
  }
  console.log("blacapi server started...");
});

//

//

process.on("unhandledRejection", (error) => {
  console.log(error);
  server.close(async () => {
    new WriteError(error, {}, "unhandledRejection");

    process.exit(1);
  });
});
