const { connect, connection } = require('mongoose');

connect('mongodb://localhost/userThoughDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;