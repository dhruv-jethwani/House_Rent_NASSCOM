import express from 'express';
import { controlUser, loginUser, getUser, getUserProfile, updateUserProfile } from '../controllers/user.controller.js';
import User from '../models/user.model.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // Added verifyToken

const router = express.Router();

router.post('/register', controlUser);
router.post('/login', loginUser);
router.get('/users', getUser);

// NEW: Profile Routes (Protected)
router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);


router.put('/users/:id/status', async (req, res) => {
    try {
        const { granted } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { granted }, { new: true });
        res.status(200).json({ message: "User status updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Failed to update status" });
    }
});

// Delete a specific user (Admin action)
router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user" });
    }
});

export default router;