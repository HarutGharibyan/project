import express from 'express';
import { body, param } from 'express-validator';
import { expressValidationResult } from '../../utils/middlewares.js';
import { nameLength, nameOnlyLaters, age } from '../../constants/errorMessages.js';
import {
  create, getAll, getOne, remove, update,
} from './controller.js';
import { getOneService } from './service.js';

const router = express.Router();

router.get('/', getAll);

async function getValidator(value) {
  const geted = await getOneService(value);
  if (!geted) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('user not found');
  }
  return true;
}

router.get(
  '/:id',
  param('id').custom(getValidator),
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

router.delete(
  '/:id',
  param('id').custom(getValidator),
  expressValidationResult,
  remove,
);

router.patch(
  '/:id',
  param('id').custom(getValidator),
  body('fname', nameLength).optional().isLength({ min: 4 }),
  body('fname', nameOnlyLaters).optional().isAlpha(),
  body('lname', nameLength).optional().isLength({ min: 4 }),
  body('lname', nameOnlyLaters).optional().isAlpha(),
  body('age', age).optional().isInt({ min: 0, max: 100 }),
  body('_id', 'can not update id').optional().custom(() => Promise.reject()),
  expressValidationResult,
  update,
);

export default router;
