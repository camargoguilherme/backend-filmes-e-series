"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Temporada = require('../models/Temporada'); var _Temporada2 = _interopRequireDefault(_Temporada);

class TemporadaController {
  // Retrieve and return all temporadas from the database.
  async find(req, res) {
    _Temporada2.default.find(
      {...req.query},
      {_id: 1, title: 1, temporadas: 1, serie: 1, episodios: 1}
    )
      .populate('episodios')
      .exec()
      .then((temporadas) => {
        return res.send(temporadas);
      })
      .catch((err) => {
        return res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving temporadas.',
        });
      });
  }
}

exports. default = new TemporadaController();
