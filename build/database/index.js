"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Configuring the database
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

_mongoose2.default.Promise = global.Promise;

// Connecting to the database
_mongoose2.default
  .connect(process.env.URL_DEV || process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    if (process.env.URL_DEV)
      console.log('Conectado ao banco de Desenvolvimento');
    else console.log('Conetado ao banco de Produção');
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

const db = _mongoose2.default.connection;
// handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('Conectado com sucesso!!!');
});
