import mongoose from 'mongoose';

const Product = mongoose.model('Product', {
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  weigh: Number,
  componyName: String,
  productType: String,
  foodType: String,
});

export default Product;
