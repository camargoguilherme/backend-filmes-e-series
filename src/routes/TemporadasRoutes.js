import express from 'express';
import TemporadaController from '../app/controllers/TemporadaController';

const router = express.Router();

const prefix = '/temporadas';

// Retrieve all Temporadas
router.get(prefix, TemporadaController.find);

export default router;
