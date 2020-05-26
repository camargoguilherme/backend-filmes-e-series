"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _SerieController = require('../app/controllers/SerieController'); var _SerieController2 = _interopRequireDefault(_SerieController);

const router = _express2.default.Router();
const prefix = '/series';

router.get(prefix, _SerieController2.default.index);

exports. default = router;
