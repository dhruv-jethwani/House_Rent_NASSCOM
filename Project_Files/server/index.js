import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import User from './models/user.model.js';
import bcrypt from 'bcryptjs';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', propertyRoutes);
app.use('/api', bookingRoutes);

// Function to seed the default admin user
const seedAdmin = async () => {
    try {
        // Check if the admin user already exists
        const adminExists = await User.findOne({ email: 'admin@gmail.com' });
        
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashed_password = await bcrypt.hash('admin_password', salt);
            
            await User.create({
                username: 'Admin',
                email: 'admin@gmail.com',
                password: hashed_password,
                type: 'Admin',
                balance: 100000000,
                granted: 'granted' // Admins don't need approval
            });
            console.log('Default Admin user seeded successfully.');
        } else {
            console.log('Admin user already exists. Skipping seed.');
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
};

// Execute the seeding function
seedAdmin();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
