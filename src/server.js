import app from './app';

const port = 3333;

app.listen(process.env.PORT || port, () => {
  /* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
  console.log(`API Running on 'http://localhost:${process.env.PORT}'`);
});
