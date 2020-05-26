"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const TemporadaSchema = _mongoose2.default.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    serie: {
      type: String,
      trim: true,
    },
    episodios: [
      {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Episodio',
      },
    ],
  },
  {
    timestamps: true,
  }
);

exports. default = _mongoose2.default.model('Temporada', TemporadaSchema, 'temporadas');
