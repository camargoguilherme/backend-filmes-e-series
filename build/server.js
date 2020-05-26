"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

const port = 3333;

_app2.default.listen(process.env.PORT || port, () => {
  /* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
  console.log(`API Running on 'http://localhost:${process.env.PORT}'`);
});
