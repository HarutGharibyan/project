import express from 'express';
import { body, param } from 'express-validator';
import { expressValidationResult } from '../../utils/middleware.js';
import * as controller from './controller.js';
import * as errorMessages from '../../constants/errorMessages.js';
import * as validator from './validator.js';
import * as laptopValidator from '../laptop/validator.js';

const router = express.Router();

router.get('/', controller.getAll);

router.get(
  '/:id',
  param('id', errorMessages.notFound).custom(validator.isExists),
  controller.getOne,
);

router.post(
  '/',
  body('laptop', errorMessages.notFound).custom(laptopValidator.isExists),
  body('count', errorMessages.integerErrMessage(1, 100000))
    .optional().isInt({ min: 1, max: 100000 }),
  expressValidationResult,
  controller.create,
);

router.patch(
  '/:id',
  param('id', errorMessages.notFound)
    .custom(validator.isExists),
  body('laptop', errorMessages.notAccessible)
    .optional().custom(() => Promise.reject()),
  body('count', errorMessages.integerErrMessage(1, 100000))
    .optional().isInt({ min: 1, max: 100000 }),
  expressValidationResult,
  controller.update,
);

router.delete(
  '/:id',
  param('id', errorMessages.notFound).custom(validator.isExists),
  expressValidationResult,
  controller.remove,
);
export default router;
