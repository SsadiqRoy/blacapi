exports.globalError = (error, req, res, next) => {
  error.oldmessage = error.message;

  // sending reasonable error in jwt token expery
  if (error.name === "TokenExpiredError") error.message = "please log in again";

  res.status(417).json({
    status: "failed",
    message: error.message,
    error,
  });
};
