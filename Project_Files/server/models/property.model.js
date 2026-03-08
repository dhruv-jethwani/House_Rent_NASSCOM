import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    propertyTitle: { 
        type: String, 
        required: true, 
        trim: true 
    },
    propertyType: {
        type: String,
        required: [true, 'Please provide a Property Type'],
        trim: true
    },
    propertyAdType: {
        type: String,
        required: [true, 'Please provide a Property Ad Type'],
        trim: true
    },
    propertyAddress: {
        type: String,
        required: [true, 'Please Provide an Address'],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'Please provide a State'],
        trim: true
    },
    ownerContact: {
        type: String,
        required: [true, 'Please provide owner contact'],
        trim: true
    },
    propertyAmt: {
        type: Number,
        default: 0
    },
    propertyImage: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String,
        trim: true
    },
    ownerName: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Available', 'Unavailable'],
        default: 'Available'
    }
}, { timestamps: true });

export default mongoose.model('Property', propertySchema);