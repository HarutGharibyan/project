import express from 'express';
import path from 'path';
import {
  creteFile, readFile, writeFile, isExists,
} from '../../utils/fs.js';

import { nameValidatr } from '../../utils/helper.js';

const usersUrl = path.resolve('users.json');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await readFile(usersUrl);
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:index', async (req, res) => {
  try {
    const { params } = req;
    const index = Number(params.index);
    const users = await readFile(usersUrl);

    if (index < 0 || index >= users.length) {
      return res.status(404).send('error user is not founded');
    }
    const user = users[index];

    return res.send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;
    if (!isExists(usersUrl)) {
      await creteFile('users.json');
    }
    nameValidatr(body.lname);
    nameValidatr(body.fname);

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
});

router.delete('/:index', (req, res) => {
  const { params } = req;
  const index = Number(params.index);
  console.log('delete', index);
  res.send('Hello World!');
});

router.patch('/:index', (req, res) => {
  const { body, params } = req;
  const index = Number(params.index);
  console.log('patch', body);
  console.log('patch', index);
  res.send('Hello World!');
});

export default router;
