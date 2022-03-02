import path from 'path';
import {
  creteFile, readFile, writeFile, isExists,
} from '../../utils/fs.js';

const usersUrl = path.resolve('api/user/users.json');
export async function getAll(req, res) {
  try {
    const users = await readFile(usersUrl);
    res.send(users);
  } catch (err) {
    console.log(err);
  }
}
export async function getOne(req, res) {
  try {
    const { params } = req;
    const index = Number(params.index);
    const users = await readFile(usersUrl);


    const user = users[index];

    return res.send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
}
export async function create(req, res) {
  try {
    const { body } = req;
    if (!isExists(usersUrl)) {
      await creteFile('api/user/users.json');
    }
    let users = await readFile(usersUrl);
    if (!users) {
      users = [];
    }
    users.push(body);
    await writeFile(usersUrl, users);
    console.log('post', body);
    return res.send(JSON.stringify(body));
  } catch (err) {
    console.log('aaaaaaaaaaaaa', err);
    return res.status(400).send(err.message);
  }
}

export function update(req, res) {
  const { body, params } = req;
  const index = Number(params.index);
  console.log('patch', body);
  console.log('patch', index);
  res.send('Hello World!');
}
export function remove(req, res) {
  const { params } = req;
  const index = Number(params.index);
  console.log('delete', index);
  res.send('Hello World!');
}
