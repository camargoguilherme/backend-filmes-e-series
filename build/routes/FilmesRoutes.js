"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _FilmeController = require('../app/controllers/FilmeController'); var _FilmeController2 = _interopRequireDefault(_FilmeController);

const router = _express2.default.Router();

const prefix = '/filmes';

// Retrieve all Movies
router.get(prefix, _FilmeController2.default.index);

exports. default = router;
