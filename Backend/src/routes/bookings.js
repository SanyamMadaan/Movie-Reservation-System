import express from 'express';
import { reserveSeats } from '../controllers/bookingsController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/reserve', authMiddleware, reserveSeats);

export default router;
