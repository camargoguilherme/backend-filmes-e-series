import express from 'express';
import SerieController from '../app/controllers/SerieController';

const router = express.Router();
const prefix = '/series';

router.get(prefix, SerieController.index);

export default router;
