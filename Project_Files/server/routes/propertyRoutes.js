import express from 'express';
import { createProperty, getPropertyList } from '../controllers/property.controller.js';
import Property from '../models/property.model.js';

const router = express.Router();

router.post('/property', createProperty);
router.get('/properties', getPropertyList);

// Update Property
router.put('/properties/:id', async (req, res) => {
    try {
        await Property.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: "Updated" });
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
});

// Delete Property
router.delete('/properties/:id', async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
});

export default router;