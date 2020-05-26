import express from 'express';

// Rotas
import {auth} from '../app/middlewares/auth';
import ParserRoutes from './ParserRoutes';

import FilmesRoutes from './FilmesRoutes';
import SeriesRoute from './SeriesRoute';
import TemporadasRoutes from './TemporadasRoutes';
import UsersRoutes from './UsersRoutes';
import SessionsRoutes from './SessionsRoutes';

const router = express.Router();

router.use(SessionsRoutes);
router.use(UsersRoutes);
router.use(auth);
router.use(ParserRoutes);
router.use(FilmesRoutes);
router.use(SeriesRoute);
router.use(TemporadasRoutes);

export default router;
