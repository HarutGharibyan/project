import mongoose from 'mongoose';

const User = mongoose.model('User', {
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  fname: String,
  lname: String,
  age: Number,
  password: String,
});

export default User;
