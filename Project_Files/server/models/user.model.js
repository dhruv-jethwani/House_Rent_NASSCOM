import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6, 
        trim: true 
    },
    type: { 
        type: String, 
        required: true, 
        enum: ["Admin", "Owner", "Renter"], 
        default: "Renter" 
    },
    granted: { 
        type: String, 
        enum: ["pending", "granted", "rejected"], 
        default: "pending" 
    },
    // NEW: Added account balance
    balance: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);