const express = require("express");

const { globalError } = require("./utils/errors");

const app = express();

app.use(express.json());

const userRoute = require("./routes/userRoutes");
const movieRoute = require("./routes/movieRoutes");
const serieRoute = require("./routes/serieRoutes");
const gameRoute = require("./routes/gameRoutes");
// =======================================================
const linkRoute = require("./routes/linkRoutes");
const screenRoute = require("./routes/screenshotRoutes");

//

app.use("/blaciris/api/v1/users", userRoute);
app.use("/blaciris/api/v1/movies", movieRoute);
app.use("/blaciris/api/v1/series", serieRoute);
app.use("/blaciris/api/v1/games", gameRoute);
// =================================================
app.use("/blaciris/api/v1/links", linkRoute);
app.use("/blaciris/api/v1/screenshots", screenRoute);

//

//

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: `could not get ${req.originalUrl}`,
  });
});

app.use(globalError);

module.exports = app;
