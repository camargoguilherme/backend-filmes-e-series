import SessionsController from '../app/controllers/SessionsController';

const express = require('express');

const router = express.Router();

const prefix = '/sessions';

// Create a new User
router.post(prefix, SessionsController.store);

export default router;
