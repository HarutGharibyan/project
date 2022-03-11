import mongoose from 'mongoose';
// import Op from '../../models/product.js';
import Order from '../../models/order.js';

export async function getOneService(id) {
  const product = await Order
    .findById(id)
    .populate(
      'product',
      ['name',
        'price',
        'weigh',
        'componyName',
        'productType',
        'foodType'],
    );

  return product;
}
export async function getAllService() {
  const products = await Order.find().populate('product', ['name', 'price']);
  return products;
}

export async function createService(body) {
  const product = new Order({
    _id: mongoose.Types.ObjectId(),
    ...body,
  });
  await product.save();
  return product;
}

export async function updateService(body, id) {
  const products = await Order.updateOne({ _id: id }, body);
  return products;
}

export async function removeService(id) {
  const products = await Order.remove({ _id: id });
  return products;
}
