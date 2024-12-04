import prisma from '../utils/prismaClient.js';

export const getTheaters = async (req, res) => {
  try {
    const theaters = await prisma.theater.findMany({ include: { screens: true } });
    res.status(200).json(theaters);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching theaters' });
  }
};

export const addTheater = async (req, res) => {
  const { name, location } = req.body;

  try {
    const theater = await prisma.theater.create({ data: { name, location } });
    res.status(201).json(theater);
  } catch (error) {
    res.status(500).json({ error: 'Error adding theater' });
  }
};
