const { promisify } = require('util');
const fs = require('fs');
const { updater } = require('./utils');

exports.globalError = async (error, req, res, next) => {
  error.oldmessage = error.message;
  const errors = JSON.parse(await promisify(fs.readFile)(`./errors/error.json`));
  error.date = new Date().toISOString();
  errors.push(error);

  if (errors.length) {
    fs.appendFile('./errors/error.log', `\n \n ${JSON.stringify(error)}`, 'utf-8', (e) => {
      if (e) {
        console.log(e);
        fs.writeFile('./errors/writeError.json', JSON.stringify(e), (e) => {
          if (e) console.log(e);
        });
      }
    });
  }
  // updater(async () => {
  // });
  // sending reasonable error in jwt token expery
  if (error.name === 'TokenExpiredError') error.message = 'please log in again';

  console.log(error);

  res.status(500).json({
    status: 'failed',
    message: error.message,
    error,
  });
};
