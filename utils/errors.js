exports.globalError = (error, req, res, next) => {
  res.status(500).json({
    status: "failed",
    message: error.message,
    error,
  });
};
