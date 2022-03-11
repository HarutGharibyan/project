// eslint-disable-next-line import/named

import express from 'express';
import { body, param } from 'express-validator';
import {
  getOne, getAll, create, update, remove,
} from './controller.js';
import {
  prodError,
} from './errorMessages.js';
import { expressValidationResult } from '../../utils/middlewares.js';
import { indexCostumValidatr } from './costumWalid.js';
import { indexCostumValidatr as productIndexCostumValidatr } from '../product/costumWalid.js';

const router = express.Router();

router.get('/', getAll);

router.get(
  '/:id',
  param('id', prodError).custom(indexCostumValidatr),
  getOne,
);

router.post(
  '/',
  body('product', 'fild is not fount').custom(productIndexCostumValidatr),
  expressValidationResult,
  create,
);

router.patch(
  '/:id',
  expressValidationResult,
  update,
);

router.delete(
  '/:id',
  param('id', prodError).custom(indexCostumValidatr),
  expressValidationResult,
  remove,
);
export default router;
