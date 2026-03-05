import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	description: {
    type: String,
    required: true,
    trim: true
  },
	image: {
		type: String,
		required: true,
		trim: true
	},
  location: {
      type: String,
      required: true,
      trim: true
  },
	price: {
		type: Number,
		required: true,
		min: 1
	},
	propertytype: {
		type: String,
		required: true
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	status: {
		type: String,
		enum: ['available', 'rented', 'sold'],
		default: 'available'
	}
})

const Property = mongoose.model('Property', propertySchema)

export default Property