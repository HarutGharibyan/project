import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { expressValidationResult } from '../../utils/middlewares.js';
import{getAll,getOne,create,remove,update} from '../product/controller.js'
import { getAllService, } from './service.js';
import{nameLength,nameOnlyLaters,price,weight,index } from '../product/errorMessage.js'

const router = express.Router();
router.get("/",getAll)
router.get(
  '/:index',
  param('index').isInt({ min: 0 }),
  param('index').toInt().custom(async (value) => {
    const geted = await getAllService();
    if (value > geted.length) {
      Promise.reject()
    }
    return true;
  }),
  expressValidationResult,
  
  
 getOne
    
);
router.post(
  '/',
  body('producttype',nameLength ).isLength({ min: 2 }),
  body('producttype',nameOnlyLaters ).isAlpha(),
  // body('productcolor', nameLength).isHexColor(),
  body('productweight',weight ).isInt({ min: 1 }),
  body('productprice',price).isInt({ min: 1,}),
  expressValidationResult,
  create,
);
router.delete('/:index',param('index').toInt().custom(async (value) => {
  const geted = await getAllService();
  console.log(geted)
  if (value > geted.length) {
    
       throw Error(index)
  }
  return true;
}),
expressValidationResult, 
remove);
router.patch(
  '/:index',
  body('producttype',nameLength ).optional().isLength({ min: 2 }),
  body('producttype',nameOnlyLaters ).optional().isAlpha(),
  param('index').optional().isInt({ min: 0 }),
  body('productname', nameLength).optional().isLength({ min: 2 }),
  body('productname', nameOnlyLaters).optional().isAlpha(),
  body('productweight', weight).optional().isLength({ min: 1 }),
  
  
  expressValidationResult,
  update,
);
 
export default router