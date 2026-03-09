import Booking from '../models/booking.model.js';
import Property from '../models/property.model.js';
import User from '../models/user.model.js';

// Create a new booking request
export const createBooking = async (req, res) => {
    try {
        const { propertyId, userID } = req.body;

        // 1. Prevent booking if property is already Unavailable
        const property = await Property.findById(propertyId);
        if (!property || property.status === 'Unavailable') {
            return res.status(400).json({ message: "Sorry, this property is already booked or unavailable." });
        }

        // 2. Prevent a user from sending multiple requests for the same property
        const existingRequest = await Booking.findOne({
            propertyId,
            userID,
            bookingStatus: { $in: ['pending', 'booked'] }
        });

        if (existingRequest) {
            return res.status(400).json({ message: "You have already sent a request for this property." });
        }

        // 3. Check for sufficient funds BEFORE creating the booking request
        const user = await User.findById(userID);
        if (user.balance < property.propertyAmt) {
            return res.status(400).json({ 
                message: `Insufficient funds. You need at least ₹${property.propertyAmt} to book this property.` 
            });
        }

        await Booking.create(req.body);
        res.status(201).json({ message: "Booking request sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create booking" });
    }
};

// Get bookings for the logged-in renter
export const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.userid;
        const bookings = await Booking.find({ userID: userId }).populate('propertyId').populate('ownerID').populate('userID');
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch bookings" });
    }
};

// Get bookings for the logged-in owner
export const getOwnerBookings = async (req, res) => {
    try {
        const ownerId = req.user.userid;
        const bookings = await Booking.find({ ownerID: ownerId }).populate('propertyId').populate('ownerID').populate('userID');
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch owner bookings" });
    }
};

// Get all bookings for the admin
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('propertyId').populate('ownerID').populate('userID');
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch all bookings" });
    }
};

// Update booking status (includes financial transactions)
export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingStatus } = req.body;
        const booking = await Booking.findById(req.params.id).populate('propertyId');
        
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        if (booking.bookingStatus === 'rejected') {
            return res.status(400).json({ message: "This booking has been rejected and its status cannot be changed." });
        }

        // --- FINANCIAL TRANSACTION LOGIC ---
        if (bookingStatus === 'booked' && booking.bookingStatus !== 'booked') {
            const tenant = await User.findById(booking.userID);
            const owner = await User.findById(booking.ownerID);
            const property = booking.propertyId;

            // Check if tenant has enough balance
            if (tenant.balance < property.propertyAmt) {
                return res.status(400).json({ 
                    message: `Tenant has insufficient funds (Balance: ₹${tenant.balance}, Requires: ₹${property.propertyAmt}).` 
                });
            }

            // Execute the transfer
            tenant.balance -= property.propertyAmt;
            owner.balance += property.propertyAmt;
            
            // Mark property as Unavailable
            property.status = 'Unavailable';

            await tenant.save();
            await owner.save();
            await property.save();

            // Auto-reject any other pending requests for this newly booked property
            await Booking.updateMany(
                { propertyId: property._id, _id: { $ne: booking._id }, bookingStatus: 'pending' },
                { bookingStatus: 'rejected' }
            );
        }

        booking.bookingStatus = bookingStatus;
        const updatedBooking = await booking.save();

        res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update booking" });
    }
};

// Renter cancels a pending booking request
export const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.bookingStatus !== 'pending') {
            return res.status(400).json({ message: "You cannot cancel a booking that has already been processed." });
        }

        if (booking.userID.toString() !== req.user.userid) {
            return res.status(403).json({ message: "Unauthorized to cancel this booking." });
        }

        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Booking request cancelled successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to cancel booking" });
    }
};