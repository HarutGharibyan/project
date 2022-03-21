import mongoose from 'mongoose';
import Mouse from '../../models/mouse.js';

export async function getOneService(id) {
  const geted = await Mouse.findById(id).populate('img');
  return geted;
}
export async function getAllService() {
  const geted = await Mouse.find().populate('img');
  return geted;
}

export async function createService(body) {
  const created = new Mouse({
    _id: mongoose.Types.ObjectId(),
    ...body,
  });
  await created.save();
  return getOneService(created._id);
}

export async function updateService(body, id) {
  const updated = await Mouse.updateOne({ _id: id }, body);
  return updated;
}

export async function removeService(id) {
  const removed = await Mouse.remove({ _id: id });
  return removed;
}
