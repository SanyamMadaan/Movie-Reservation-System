import express from 'express';
import { getMovies, addMovie } from '../controllers/moviesController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getMovies);
router.post('/', authMiddleware, addMovie);

export default router;
