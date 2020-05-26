"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _TemporadaController = require('../app/controllers/TemporadaController'); var _TemporadaController2 = _interopRequireDefault(_TemporadaController);

const router = _express2.default.Router();

const prefix = '/temporadas';

// Retrieve all Temporadas
router.get(prefix, _TemporadaController2.default.find);

exports. default = router;
