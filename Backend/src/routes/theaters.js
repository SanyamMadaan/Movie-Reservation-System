import express from 'express';
import { getTheaters, addTheater } from '../controllers/theatersController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getTheaters);
router.post('/', authMiddleware, addTheater);

export default router;
