import express from 'express';
import Booking from '../models/booking.model.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/booking', async (req, res) => {
    try {
        await Booking.create(req.body);
        res.status(201).json({ message: "Booking request sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create booking" });
    }
});

router.get('/bookings', verifyToken, async (req, res) => {
    try {
        const userId = req.user.userid;
        const bookings = await Booking.find({ userID: userId }).populate('propertyId').populate('ownerID').populate('userID');
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch bookings" });
    }
});

// Get bookings for property owners
router.get('/owner-bookings', verifyToken, async (req, res) => {
    try {
        const ownerId = req.user.userid;
        const bookings = await Booking.find({ ownerID: ownerId }).populate('propertyId').populate('ownerID').populate('userID');
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch owner bookings" });
    }
});

// Get all bookings for admin
router.get('/all-bookings', verifyToken, async (req, res) => {
    try {
        const bookings = await Booking.find().populate('propertyId').populate('ownerID').populate('userID');
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch all bookings" });
    }
});

// Update booking status
router.put('/booking/:id', async (req, res) => {
    try {
        const { bookingStatus } = req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { bookingStatus }, { new: true });
        if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });
        res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update booking" });
    }
});

export default router;