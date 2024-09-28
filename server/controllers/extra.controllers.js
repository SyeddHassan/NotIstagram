// TESTING ROUTE FUNTION
export const testRouteFunction = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Successful test.",
  });
};

// UNKNOWN ROUTE FUNTION
export const unknownRouteFunction = (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found.`);
  err.statusCode = 404;
  next(err);
};
