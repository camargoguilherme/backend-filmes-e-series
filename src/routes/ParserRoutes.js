import express from 'express';
import ParserController from '../app/controllers/ParserController';

const router = express.Router();

// router.get('/parser/filmes', ParserController.filmes);

router.get('/parser/series', ParserController.series);

router.get('/parser/temporadas', ParserController.temporadas);

router.get('/parser/episodios', ParserController.episodios);

router.delete('/parser/episodios', ParserController.delete);

// router.get('/parser/animes', ParserController.animes);

// router.get('/parser/preparar');

export default router;
