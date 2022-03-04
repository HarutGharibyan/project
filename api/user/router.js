import express from 'express';
import { body, param } from 'express-validator';
import { expressValidationResult } from '../../utils/middlewares.js';
import { nameLength, nameOnlyLaters, age } from '../../constants/errorMessages.js';
import {
  create, getAll, getOne, remove, update,
} from './controller.js';
import { getAllService } from './service.js';

const router = express.Router();

router.get('/', getAll);

router.get(
  '/:index',
  param('index').isInt({ min: 0 }),
  param('index').toInt().custom(async (value) => {
    const geted = await getAllService();
    if (value > geted.length) {
      return Promise.reject();
    }
    return true;
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

router.patch(
  '/:index',
  param('index').isInt({ min: 0 }),
  body('fname', nameLength).optional().isLength({ min: 4 }),
  body('fname', nameOnlyLaters).optional().isAlpha(),
  body('lname', nameLength).optional().isLength({ min: 4 }),
  body('lname', nameOnlyLaters).optional().isAlpha(),
  body('age', age).optional().isInt({ min: 0, max: 100 }),
  expressValidationResult,
  update,
);

export default router;
