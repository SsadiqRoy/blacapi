const express = require("express");

const { globalError } = require("./utils/errors");

const app = express();

app.use(express.json());

const userRoute = require("./routes/userRoutes");

//

app.use("/blaciris/api/v1/users", userRoute);
app.use("/blaciris/api/v1/movies", userRoute);

// 421d2d0e316249b783d183dc68519255
// 8e00af4e919c40f1b9a95c2e94190395
// 7441db81a41342f9a7db488b225a5411

//

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: `could not get ${req.originalUrl}`,
  });
});

app.use(globalError);

module.exports = app;
