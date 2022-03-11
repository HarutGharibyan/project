import { getOneService } from './service.js';

export function nameCostomValid(val) {
  if (val[0] < 'A' || val[0] > 'Z') {
    return Promise.reject();
  }
  return true;
}

export async function indexCostumValidatr(val) {
  const order = await getOneService(val);
  if (!order) {
    return Promise.reject();
  }
  return true;
}
