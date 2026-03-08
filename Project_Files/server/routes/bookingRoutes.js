import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { 
    createBooking, 
    getUserBookings, 
    getOwnerBookings, 
    getAllBookings, 
    updateBookingStatus, 
    deleteBooking 
} from '../controllers/booking.controller.js';

const router = express.Router();

// Create a new booking request
router.post('/booking', createBooking);

// Retrieve bookings based on user roles
router.get('/bookings', verifyToken, getUserBookings);
router.get('/owner-bookings', verifyToken, getOwnerBookings);
router.get('/all-bookings', verifyToken, getAllBookings);

// Update a booking's status (Admin/Owner)
router.put('/booking/:id', updateBookingStatus);

// Delete/Cancel a pending booking (Renter)
router.delete('/booking/:id', verifyToken, deleteBooking);

export default router;