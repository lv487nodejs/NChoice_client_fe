const mongoose = require('mongoose');

const { Schema } = mongoose;

const PropetriesSchema = require('./ProductPropetries');

const ProductSchema = new Schema({
  catalog: { 
    type: Schema.Types.ObjectId, 
    ref: 'catalog' 
  },
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'category' 
  },
  brand: { 
    type: Schema.Types.ObjectId, 
    ref: 'brand' 
  },
  title: { 
    type: String,
    required: true 
  },
  description: {
    type: String, 
    required: true 
  },
  color: { 
    type: Schema.Types.ObjectId, 
    ref: 'color' 
  },
  material: {
    type: String,
    enum: ['cotton', 'jute', 'silk', 'ramie', 'wool', 'recycled']
  },
  mrsp: { 
    type: Number, 
    min: 0 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  rate: Number,
  avgRate:Number,
  images: [String],
  propetries: [PropetriesSchema],
  modified: { 
    type: Date, 
    default: Date.now 
  },
});

ProductSchema.index(
  { "title": "text", "description": "text" },
  { "weights": { "title": 5 } }
);

const Products = mongoose.model('product', ProductSchema);

module.exports = Products;
