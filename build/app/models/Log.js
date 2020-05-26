"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const LogSchema = _mongoose2.default.Schema(
  {
    url: {
      type: String,
      trim: true,
    },
    error: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

exports. default = _mongoose2.default.model('Log', LogSchema);
