const allowedOrigins = () => {
  const origins = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

  if (process.env.NODE_ENV === 'PRODUCTION') {
    return {
      origin: 'https://example.com',
      credentials: true,
      https: true,
    };
  }

  return origins;
};

module.exports = allowedOrigins;
