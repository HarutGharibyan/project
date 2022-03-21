import express from 'express';
import { body, param } from 'express-validator';
import { expressValidationResult } from '../../utils/middleware.js';
import * as controller from './controller.js';
import * as errorMessages from '../../constants/errorMessages.js';
import * as validator from './validator.js';
import * as fileValidator from '../file/validator.js';

const router = express.Router();

router.get('/', controller.getAll);

router.get(
  '/:id',
  param('id', errorMessages.notFound).custom(validator.isExists),
  controller.getOne,
);

router.post(
  '/',
  body('name', errorMessages.stringErrMessage(4, 255))
    .isLength({ min: 4, max: 255 }),
  body('brand', errorMessages.stringErrMessage(4, 255))
    .isLength({ min: 4, max: 255 }),
  body('isWireless', errorMessages.isBool)
    .isBoolean(),
  body('color', errorMessages.stringErrMessage(4, 255))
    .isHexColor(),
  body('price', errorMessages.integerErrMessage(0, 10000))
    .isInt({ min: 0, max: 100000 }),
  body('img', errorMessages.notFound).custom(fileValidator.isExists),
  expressValidationResult,
  controller.create,
);

router.patch(
  '/:id',
  param('id', errorMessages.notFound).custom(validator.isExists),
  body('name', errorMessages.stringErrMessage(4, 255))
    .optional().isLength({ min: 4, max: 255 }),
  body('brand', errorMessages.stringErrMessage(4, 255))
    .optional().isLength({ min: 4, max: 255 }),
  body('isWireless ', errorMessages.isBool)
    .optional().isBoolean(),
  body('color', errorMessages.stringErrMessage(4, 255))
    .optional().isHexColor(),
  body('price', errorMessages.integerErrMessage(0, 10000))
    .optional().isInt({ min: 0, max: 100000 }),
  body('img', errorMessages.notFound)
    .optional().custom(fileValidator.isExists),
  body('_id', errorMessages.notAccessible)
    .optional().custom(() => Promise.reject()),
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
