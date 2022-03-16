import mongoose from 'mongoose';

const Order = mongoose.model('Order', {
  _id: mongoose.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Laptop',
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

export default Order;
