import mongoose from 'mongoose';

const Product = mongoose.model('Laptop', {
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  weight: Number,
  brand: String,
  color: String,
});

export default Product;
