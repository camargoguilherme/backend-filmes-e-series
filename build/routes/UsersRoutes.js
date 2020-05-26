"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _UserController = require('../app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _auth = require('../app/middlewares/auth');

const express = require('express');

const router = express.Router();

const prefix = '/users';

// Create a new User
router.post(prefix, _UserController2.default.store);

// Update a User with userId
router.put(`${prefix}`, _auth.auth, _UserController2.default.update);

exports. default = router;
