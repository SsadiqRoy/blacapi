const fs = require('fs');
const { updater } = require('./utils');

exports.globalError = (error, req, res, next) => {
  error.oldmessage = error.message;

  // sending reasonable error in jwt token expery
  if (error.name === 'TokenExpiredError') error.message = 'please log in again';

  console.log(error);
  updater(async () => {
    const errors = JSON.parse(await fs.readFile(`./errors/error.js`));
    error.date = date.now();
    error.push(error);
    fs.writeFile('./errors/error.json', JSON.stringify(errors));
  });
  res.status(500).json({
    status: 'failed',
    message: error.message,
    error,
  });
};
