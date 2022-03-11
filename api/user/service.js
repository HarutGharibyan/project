import mongoose from 'mongoose';
import User from '../../models/user.js';

export async function getAllService() {
  const users = await User
    .find()
    .select(['username', 'fname', 'lname', 'age']);
  return users;
}

export async function getOneService(id) {
  const user = await User
    .findById(id)
    .select(['username', 'fname', 'lname', 'age']);
    // .select('username fname lname age');
  return user;
}

export async function createService(body) {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    ...body,
  });
  await user.save();

  return user;
}

export async function updateService(id, body) {
  const user = await User
    .findByIdAndUpdate({ _id: id }, body, { new: true })
    .select(['username', 'fname', 'lname', 'age']);
  return user;
}

export async function removeService(id) {
  const user = await User
    .findOneAndRemove({ _id: id })
    .select(['username', 'fname', 'lname', 'age']);
  return user;
}
