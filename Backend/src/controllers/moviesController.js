import prisma from '../utils/prismaClient.js';

export const getMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movies' });
  }
};

export const addMovie = async (req, res) => {
  const { title, genre, director, actors, releaseDate, theaterId } = req.body;

  try {
    const movie = await prisma.movie.create({
      data: { title, genre, director, actors, releaseDate: new Date(releaseDate), theaterId },
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error adding movie' });
  }
};
