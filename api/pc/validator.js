import { getOneService } from './service.js';

export async function isExists(value) {
  const geted = await getOneService(value);
  if (!geted) {
    return Promise.reject();
  }
  return true;
}
