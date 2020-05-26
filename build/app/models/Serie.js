"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const SerieSchema = _mongoose2.default.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    uriPage: {
      type: String,
      trim: true,
    },
    posterStart: {
      type: String,
      trim: true,
    },
    resume: {
      type: String,
      trim: true,
    },
    status: Boolean,
    date: {
      type: String,
      trim: true,
    },
    language: {
      type: String,
      trim: true,
    },
    conclude: {
      type: Boolean,
      default: false,
    },
    temporadas: [
      {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Temporada',
      },
    ],
    category: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

exports. default = _mongoose2.default.model('Serie', SerieSchema, 'series');
