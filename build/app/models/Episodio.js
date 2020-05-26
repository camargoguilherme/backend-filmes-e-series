"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const EpisodioSchema = _mongoose2.default.Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    temporada: {
      type: String,
      trim: true,
    },
    serie: {
      type: String,
      trim: true,
    },
    uri: {
      type: String,
      trim: true,
    },
    conclude: {
      type: Boolean,
      default: false,
    },
    servers: [
      {
        link: {
          type: String,
          trim: true,
        },
        name: {
          type: String,
          trim: true,
        },
      },
    ],
    dublado: Boolean,
  },
  {
    timestamps: true,
  }
);

exports. default = _mongoose2.default.model('Episodio', EpisodioSchema, 'episodios');
