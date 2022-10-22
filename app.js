const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors');

const { globalError } = require('./utils/errors');

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(cors({ origin: ['http://localhost:2500'], credentials: true }));

const userRoute = require('./routes/userRoutes');
const movieRoute = require('./routes/movieRoutes');
const serieRoute = require('./routes/serieRoutes');
const gameRoute = require('./routes/gameRoutes');
// =======================================================
const seasonRoute = require('./routes/seasonRoutes');
const episodeRoute = require('./routes/episodeRoutes');
const linkRoute = require('./routes/linkRoutes');
const notificationRoute = require('./routes/notificationRoutes');
const scheduleRoute = require('./routes/scheduleRoutes');
const suggestionRoute = require('./routes/suggestionRoutes');
const problemRoute = require('./routes/problemRoutes');
const otherRoute = require('./routes/otherRoutes');

const { loggedIn } = require('./middlewares/protectMiddleware');
const { updater } = require('./utils/utils');
const { initializeAllSchedules } = require('./controllers/schedulesController');

//
// updater(initializeAllSchedules);

//
app.use(loggedIn);
app.use('/v1/users', userRoute);
app.use('/v1/movies', movieRoute);
app.use('/v1/series', serieRoute);
app.use('/v1/games', gameRoute);

// =================================================
app.use('/v1/seasons', seasonRoute);
app.use('/v1/episodes', episodeRoute);
app.use('/v1/links', linkRoute);
app.use('/v1/notifications', notificationRoute);
app.use('/v1/schedules', scheduleRoute);
app.use('/v1/suggestions', suggestionRoute);
app.use('/v1/problems', problemRoute);
app.use('/v1/others', otherRoute);

//

//

app.use('*', (req, res, next) => {
  res.status(500).json({
    status: 'failed',
    message: `could not get ${req.originalUrl}`,
  });
});

app.use(globalError);

module.exports = app;
