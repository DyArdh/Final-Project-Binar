const limiter = {
  windowMs: 60 * 1000, // 1 minutes
  max: 20, // mex req
  message: 'Too many requests from your IP. Please try again later.',
};

module.exports = limiter;
