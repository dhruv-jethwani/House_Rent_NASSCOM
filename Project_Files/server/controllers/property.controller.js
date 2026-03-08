import Property from "../models/property.model.js";

async function createProperty(req, res){
    try {
        const { propertyTitle, propertyType, propertyAdType, propertyAddress, state, ownerContact, propertyAmt, propertyImage, additionalInfo, ownerName, ownerId } = req.body;
        
        if (!ownerId || !propertyTitle || !propertyType || !propertyAdType || !propertyAddress || !state || !ownerContact || !propertyImage) {
            return res.status(400).json({ message: "Missing required property fields." });
        }

        await Property.create({ ownerId, propertyTitle, propertyType, propertyAdType, propertyAddress, state, ownerContact, propertyAmt, propertyImage, additionalInfo, ownerName });
        
        return res.status(201).json({ message: "Property Created Successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to create property" });
    }
}

async function getPropertyList(req, res){
    try {
        const properties = await Property.find().populate('ownerId', 'username email');
        return res.status(200).json({ properties });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to retrieve property list" });
    }
}

export { createProperty, getPropertyList };