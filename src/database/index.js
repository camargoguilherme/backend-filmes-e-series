// Configuring the database
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
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

const db = mongoose.connection;
// handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('Conectado com sucesso!!!');
});
