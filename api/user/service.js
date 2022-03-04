import path from 'path';
import {
  creteFile, readFile, writeFile, isExists,
} from '../../utils/fs.js';

const usersUrl = path.resolve('api/user/users.json');

export async function getAllService() {
  const users = await readFile(usersUrl);
  return users;
}

export async function getOneService(params) {
  const index = Number(params.index);
  const users = await readFile(usersUrl);
  const user = users[index];
  return user;
}

export async function createService(body) {
  if (!isExists(usersUrl)) {
    await creteFile('api/user/users.json');
  }
  let users = await readFile(usersUrl);
  if (!users) {
    users = [];
  }
  users.push(body);
  await writeFile(usersUrl, users);
  return body;
}

export async function updateService(params, body) {
  return params + body;
}

export function removeService(params) {
  const index = Number(params.index);
  return index;
}
