import prisma from '../utils/prismaClient.js';

export const reserveSeats = async (req, res) => {
  const { showtimeId, seats } = req.body;
  const userId = req.userId;

  try {
    // Start a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Fetch available seats
      const showtime = await prisma.showtime.findUnique({
        where: { id: showtimeId },
        include: { bookings: true },
      });

      const reservedSeats = showtime.bookings.reduce((total, booking) => total + booking.seats, 0);
      const availableSeats = showtime.seats - reservedSeats;

      if (seats > availableSeats) {
        throw new Error('Not enough seats available');
      }

      // Create a new booking
      const booking = await prisma.booking.create({
        data: { userId, showtimeId, seats },
      });

      return booking;
    });

    res.status(201).json({ message: 'Seats reserved successfully', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
