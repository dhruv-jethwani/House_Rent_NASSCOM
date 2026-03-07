import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    propertyId: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'Property', 
			required: true 
		},
    ownerID: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'User', 
			required: true 
		},
    userID: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'User', 
			required: true },
    userName: { 
			type: String, 
			required: true, 
			trim: true 
		},
    phone: { 
			type: String, 
			required: true, 
			trim: true 
		},
    bookingStatus: { 
			type: String, 
			required: true, 
			enum: ['pending', 'booked', 'rejected'], 
			default: 'pending' 
		}
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);