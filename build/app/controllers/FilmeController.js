"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Filme = require('../models/Filme'); var _Filme2 = _interopRequireDefault(_Filme);

class FilmeController {
  // Retrieve and return all movies from the database.
  async index(req, res) {
    _Filme2.default.find()
      .then((filmes) => {
        res.send(filmes);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Ocorreu um erro ao recuperar os filmes',
        });
      });
  }
}

exports. default = new FilmeController();
