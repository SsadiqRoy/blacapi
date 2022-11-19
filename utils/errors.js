const { promisify } = require('util');
const fs = require('fs');
const { WriteError } = require('../errors/writeError');
// const { updater } = require('./utils');

exports.globalError = async (error, req, res, next) => {
  error.oldmessage = error.message;
  new WriteError(error, req, 'GLOBAL_ERROR');
  // sending reasonable error in jwt token expery
  if (error.name === 'TokenExpiredError') error.message = 'please log in again';

  console.log(error);

  res.status(500).json({
    status: 'failed',
    message: error.message,
    error,
  });
};
