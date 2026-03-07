import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', propertyRoutes);
app.use('/api', bookingRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});