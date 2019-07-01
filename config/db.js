const mongoose = require('mongoose');

const initDB = () => {
  mongoose.set('useCreateIndex', true)
  //mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
  mongoose.connect('mongodb://test:test123@ds345597.mlab.com:45597/heroku_m0z4zdfm', { useNewUrlParser: true });
  mongoose.connection.once('open', () => {
    console.log('connected to database');
  });

}

module.exports = initDB;