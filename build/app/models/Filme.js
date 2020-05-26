"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const FilmeSchema = _mongoose2.default.Schema(
  {
    titulo: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    uri: Array,
    referer: String,
    uriPage: String,
    resumo: String,
    posterStart: String,
    category: [
      {
        type: String,
      },
    ],
    new: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

exports. default = _mongoose2.default.model('Filme', FilmeSchema);
