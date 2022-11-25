const { WriteError } = require('../errors/writeError');

exports.globalError = async (error, req, res, next) => {
  error.oldmessage = error.message;
  // sending reasonable error in jwt token expery
  if (error.name === 'TokenExpiredError') {
    error.message = 'please log in again';
    error.isOperational = true;
  }
  if (error.parent && error.parent.code === 'ER_DATA_TOO_LONG') {
    error.message = `Data to long for field ${error.parent.text.split('column ')[1].split(' ')[0]}`;
    error.isOperational = true;
  }

  if (error.isOperational) {
    return res.status(500).json({
      status: 'failed',
      message: error.message,
      error,
    });
  }
  console.log(error);
  new WriteError(error, req, 'GLOBAL_ERROR');
  error.message = 'Something went wrong on the server side';
  res.status(500).json({
    status: 'failed',
    message: error.message,
    error,
  });
};
