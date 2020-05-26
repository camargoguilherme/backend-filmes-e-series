"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const AnimeSchema = _mongoose2.default.Schema(
  {
    title: String,
    uriPage: String,
    posterStart: String,
    resume: String,
    status: Boolean,
    temporadas: [
      {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Temporada',
      },
    ],
    category: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

exports. default = _mongoose2.default.model('Anime', AnimeSchema);
