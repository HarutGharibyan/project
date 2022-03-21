import mongoose from 'mongoose';
import Pc from '../../models/pc.js';

export async function getOneService(id) {
  const geted = await Pc.findById(id).populate([{
    path: 'img',
    select: ['fileName'],
  }, {
    path: 'mouse',
    model: 'Mouse',
    populate: {
      path: 'img',
    },
  }]);
  return geted;
}
export async function getAllService() {
  const geted = await Pc.find().populate('img').populate('mouse');
  return geted;
}

export async function createService(body) {
  const created = new Pc({
    _id: mongoose.Types.ObjectId(),
    ...body,
  });
  await created.save();
  return getOneService(created._id);
}

export async function updateService(body, id) {
  const updated = await Pc.updateOne({ _id: id }, body);
  return updated;
}

export async function removeService(id) {
  const removed = await Pc.remove({ _id: id });
  return removed;
}
