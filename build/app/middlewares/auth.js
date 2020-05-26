"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

 const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({error: 'Token not provider'});
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, _auth2.default.secret);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({error: 'Token invalid'});
  }
}; exports.auth = auth;

 const isAdmin = async (req, res, next) => {
  try {
    const user = await _User2.default.findById(req.userId);
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    if (user.idAdmin) {
      return next();
    }
    return res.status(401).json({error: 'User is not admin'});
  } catch (error) {
    return res.status(401).json({error: 'User is not admin'});
  }
}; exports.isAdmin = isAdmin;
