"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _SessionsController = require('../app/controllers/SessionsController'); var _SessionsController2 = _interopRequireDefault(_SessionsController);

const express = require('express');

const router = express.Router();

const prefix = '/sessions';

// Create a new User
router.post(prefix, _SessionsController2.default.store);

exports. default = router;
