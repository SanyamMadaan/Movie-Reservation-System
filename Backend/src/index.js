import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import moviesRouter from './routes/movies.js';
import theatersRouter from './routes/theaters.js';
import authRouter from './routes/auth.js';
import bookingsRouter from './routes/bookings.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/movies', moviesRouter);
app.use('/api/theaters', theatersRouter);
app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingsRouter);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
