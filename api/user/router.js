import express from 'express';

import { body, param } from 'express-validator';
import path from 'path';
import { expressValidationResult } from '../../utils/middlewares.js';
import { nameLength, nameOnlyLaters, age } from '../../constants/errorMessages.js';
import {
  create, getAll, getOne, remove, update,
} from './controller.js';

import {
  readFile,
} from '../../utils/fs.js';

const router = express.Router();

router.get('/', getAll);

const usersUrl = path.resolve('api/user/users.json');
router.get(
  '/:index',
  param('index').isInt({ min: 0 }),
  param('index').custom(async (index) => {
    const users = await readFile(usersUrl);
    if (index >= users.length) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('error user is not founded');
    }
  }),
  expressValidationResult,
  getOne,
);

router.post(
  '/',
  body('fname', nameLength).isLength({ min: 4 }),
  body('fname', nameOnlyLaters).isAlpha(),
  body('lname', nameLength).isLength({ min: 4 }),
  body('lname', nameOnlyLaters).isAlpha(),
  body('age', age).isInt({ min: 0, max: 100 }),
  expressValidationResult,
  create,
);

router.delete('/:index', remove);

router.patch('/:index', update);

export default router;
