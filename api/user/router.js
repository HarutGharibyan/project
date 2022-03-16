import express from 'express';
import { body, param } from 'express-validator';
import { expressValidationResult } from '../../utils/middleware.js';
import * as errorMessages from '../../constants/errorMessages.js';
import * as controller from './controller.js';
import * as validator from './validator.js';

const router = express.Router();

router.get('/', controller.getAll);

router.get(
  '/:id',
  param('id', errorMessages.notFound).custom(validator.isExists),
  expressValidationResult,
  controller.getOne,
);

router.post(
  '/',
  body('fname', errorMessages.stringErrMessage(4, 255)).isLength({ min: 4, max: 255 }),
  body('fname', errorMessages.nameOnlyLetters).isAlpha(),
  body('lname', errorMessages.stringErrMessage(4, 255)).isLength({ min: 4, max: 255 }),
  body('lname', errorMessages.nameOnlyLetters).isAlpha(),
  body('age', errorMessages.integerErrMessage(0, 100)).isInt({ min: 0, max: 100 }),
  expressValidationResult,
  controller.create,
);

router.delete(
  '/:id',
  param('id', errorMessages.notFound).custom(validator.isExists),
  expressValidationResult,
  controller.remove,
);

router.patch(
  '/:id',
  param('id', errorMessages.notFound).custom(validator.isExists),
  body('fname', errorMessages.stringErrMessage(4, 255)).optional().isLength({ min: 4, max: 255 }),
  body('fname', errorMessages.nameOnlyLetters).optional().isAlpha(),
  body('lname', errorMessages.stringErrMessage(4, 255)).optional().isLength({ min: 4, max: 255 }),
  body('lname', errorMessages.nameOnlyLetters).optional().isAlpha(),
  body('age', errorMessages.integerErrMessage(0, 100)).optional().isInt({ min: 0, max: 100 }),
  body('_id', errorMessages.notAccessible).optional().custom(() => Promise.reject()),
  expressValidationResult,
  controller.update,
);

export default router;
