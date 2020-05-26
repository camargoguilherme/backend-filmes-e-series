"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);

// Rotas
var _auth = require('../app/middlewares/auth');
var _ParserRoutes = require('./ParserRoutes'); var _ParserRoutes2 = _interopRequireDefault(_ParserRoutes);

var _FilmesRoutes = require('./FilmesRoutes'); var _FilmesRoutes2 = _interopRequireDefault(_FilmesRoutes);
var _SeriesRoute = require('./SeriesRoute'); var _SeriesRoute2 = _interopRequireDefault(_SeriesRoute);
var _TemporadasRoutes = require('./TemporadasRoutes'); var _TemporadasRoutes2 = _interopRequireDefault(_TemporadasRoutes);
var _UsersRoutes = require('./UsersRoutes'); var _UsersRoutes2 = _interopRequireDefault(_UsersRoutes);
var _SessionsRoutes = require('./SessionsRoutes'); var _SessionsRoutes2 = _interopRequireDefault(_SessionsRoutes);

const router = _express2.default.Router();

router.use(_SessionsRoutes2.default);
router.use(_UsersRoutes2.default);
router.use(_auth.auth);
router.use(_ParserRoutes2.default);
router.use(_FilmesRoutes2.default);
router.use(_SeriesRoute2.default);
router.use(_TemporadasRoutes2.default);

exports. default = router;
