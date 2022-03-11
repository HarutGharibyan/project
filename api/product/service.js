import mongoose from 'mongoose';
import Product from '../../models/product.js';

export async function getOneService(id) {
  console.log(id);
  const product = await Product.findById(id);
  return product;
}
export async function getAllService() {
  const products = await Product.find();
  return products;
}

export async function createService(body) {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    ...body,
  });
  await product.save();
  return product;
}

export async function updateService(body, id) {
  const products = await Product.updateOne({ _id: id }, body);
  return products;
}

export async function removeService(id) {
  const products = await Product.remove({ _id: id });
  return products;
}
