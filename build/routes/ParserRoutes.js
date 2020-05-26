"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _ParserController = require('../app/controllers/ParserController'); var _ParserController2 = _interopRequireDefault(_ParserController);

const router = _express2.default.Router();

// router.get('/parser/filmes', ParserController.filmes);

router.get('/parser/series', _ParserController2.default.series);

router.get('/parser/temporadas', _ParserController2.default.temporadas);

router.get('/parser/episodios', _ParserController2.default.episodios);

router.delete('/parser/episodios', _ParserController2.default.delete);

// router.get('/parser/animes', ParserController.animes);

// router.get('/parser/preparar');

exports. default = router;
