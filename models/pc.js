import mongoose from 'mongoose';

const Pc = mongoose.model('Pc', {
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  mouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mouse',
    required: true,
  },
  img: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true,
  },
});

export default Pc;
