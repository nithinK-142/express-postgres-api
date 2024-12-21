const errorHandler = (err, req, res, next) => {
  console.log("Error Stack", err.stack);
  return res.status(500).json({
    status: 500,
    message: "Something went wrong",
    error: err.message,
  });
};

export default errorHandler;
