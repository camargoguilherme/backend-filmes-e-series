import express from 'express';
import FilmeController from '../app/controllers/FilmeController';

const router = express.Router();

const prefix = '/filmes';

// Retrieve all Movies
router.get(prefix, FilmeController.index);

export default router;
