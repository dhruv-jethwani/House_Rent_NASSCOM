import express from 'express';
// Import deleteUser from your controller
import { controlUser, loginUser, getUser, getUserProfile, updateUserProfile, deleteUser } from '../controllers/user.controller.js';
import User from '../models/user.model.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', controlUser);
router.post('/login', loginUser);
router.get('/users', getUser);

// Profile Routes (Protected)
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

// Clean, simple route pointing to the controller!
router.delete('/users/:id', deleteUser);

export default router;