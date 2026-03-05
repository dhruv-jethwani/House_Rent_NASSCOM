import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	property_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Property',
		required: true
	},
	bookingDate: {
		type: Date,
		required: true
	},
	status: {
		type: String,
		enum: ['pending', 'approved', 'rejected'],
		default: 'pending'
	}
}, {timestamps : true})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking