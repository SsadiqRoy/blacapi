exports.globalError = (error, req, res, next) => {
  error.oldmessage = error.message;

  // sending reasonable error in jwt token expery
  if (error.name === 'TokenExpiredError') error.message = 'please log in again';

  console.log(error);
  res.status(500).json({
    status: 'failed',
    message: error.message,
    error,
  });
};
