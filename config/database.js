const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {})
    .then(() => {
      console.log('Database connection successful');
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectDatabase;
