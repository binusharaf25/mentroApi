export const errorHandler = (err, req, res, next) => {
   
  const status = err.statusCode || 500;
  res.status(status).json({
    succss: false,
    message: err.message || 'Something went wrong ',
    status,
  });
};
