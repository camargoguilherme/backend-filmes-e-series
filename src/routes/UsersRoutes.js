import UserController from '../app/controllers/UserController';
import {auth} from '../app/middlewares/auth';

const express = require('express');

const router = express.Router();

const prefix = '/users';

// Create a new User
router.post(prefix, UserController.store);

// Update a User with userId
router.put(`${prefix}`, auth, UserController.update);

export default router;
