import Property from "../models/property.model.js";

async function controlProduct(req, res){
	try {
		const {name, description, image, location, price, propertytype, owner, status} = req.body
		await Property.create({name, description, image, location, price, propertytype, owner, status})
		return res.status(201).json({ message: "Property Created Successfully." });
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: "Failed to retrieve users" });
	}
}

async function getPropertyList(req, res){
	try {
		const property = await Property.find()
		return res.status(200).json({property})
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: "Failed to retrieve property list" })
	}
}

async function searchProperty(req, res){
	try {
		const {name} = req.params.name
		//....................
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: "Failed to retrieve property" })
	}
}