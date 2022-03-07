import express from 'express';
import { body, param } from 'express-validator';
import { expressValidationResult } from '../../utils/middlewares.js';
import { nameLength, nameOnlyLaters, age } from '../../constants/errorMessages.js';
import {
  create, getAll, getOne, remove, update,
} from './controller.js';
import { getAllService, } from './service.js';


const router = express.Router();

router.get('/', getAll);

router.get(
  '/:index',
  param('index').isInt({ min: 0 }),
  param('index').toInt().custom(async (value) => {
    const geted = await getAllService();
    console.log(geted);
    if (value > geted.length) {
    throw Error()
    }
    return true;
  }),
  expressValidationResult,
  
  
getOne
    
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
// import express from 'express';
// import path from 'path';
// import fs from 'fs';
// import { writeFile, readFile, creteFile } from '../../utils/helps.js';
// import val1 from '../../utils/validator/val1.js';
// import val2 from '../../utils/validator/val2.js';

// const router = express.Router();
// const usersUrl = path.resolve('user.json');

// router.get('/adam', async (req, res,next) => {
//   console.log(req.url,5);
//   try {
//     const body = await readFile(usersUrl);
//     const user = [];
//     if (!body) {
//       throw Error('user chka');
//     }
//     for (const key of body) {
//       user.push(key);
//     }
//     next("jhjb")

//     //res.send(user);
//   } catch (err) {
//     console.log(err);
//   }
// });
// router.get('/:index', async (req, res) => {
//   try {
//     const { params } = req;
//     const index = Number((params).index);
//     const body = await readFile(usersUrl);
//     val2(body, index);
//     const user = [];
//     for (const key of body) {
//       user.push(key);
//     }
//     res.send(user[index]);
//   } catch (err) {
//     console.log(err);
//   }
// });
// router.post('/', async (req, res,next) => {
//   try {
//     const { body } = req;

//     if (!fs.existsSync(usersUrl)) {
//       await creteFile('users.json');
//     }
//     let users = await readFile(usersUrl);

//     if (!users) {
//       users = [];
//     }
//     val1(body, users,next);
    // for (const key of users) {
    //   if (key.username === body.username) {
    //     throw Error(1.1);
    //   }
    // }
    // for (let i = 0; i < body.fNname.length; i++) {
    //   const b = body.fNname[i].codePointAt();
    //   if (!((b >= 65 && b <= 90) || (b >= 97 && b <= 122))) {
    //     throw Error(1.2);
    //   }
    // }

    // if (!body.fNname[0].codePointAt() < 'A') {
    //   throw Error(1.2);
    // }

    // if (body.fNname.length <= 4) {
    //   throw Error(1.2);
    // }
    // for (let i = 0; i < body.INname.length; i++) {
    //   const b = body.INname[i].codePointAt();
    //   if (!((b >= 65 && b <= 90) || (b >= 97 && b <= 122))) {
    //     throw Error(1.3);
    //   }
    // }

    // if (!body.INname[0].codePointAt() < 'A') {
    //   throw Error(1.3);
    // }
    // console.log(5);
    // if (body.INname.length <= 4) {
    //   throw Error(1.3);
    // }
    // if (body.Age > 0 && body.length < 150) {
    //   throw Error(1.4);
    // }

//     users.push(body);
//     await writeFile(usersUrl, users);
//     res.send('hello World');
//   } catch (err) {
//     console.log(err);
//   }
// });
// router.delete('/:index', (req, res) => {
//   try {
//     if (!fs.existsSync(usersUrl)) {
//       throw Error();
//     }
//     const { params } = req;
//     const index = Number(params.index);

//     let users = fs.readFileSync(usersUrl, 'utf8', (err, data) => (data));
//     users = JSON.parse(users);
//     users.splice(index, 1);
//     users = JSON.stringify(users);
//     fs.writeFile(usersUrl, users, (err) => {
//       console.log(err);
//     });
//     console.log('delete', index);
//     res.send('Hello World!');
//   } catch (err) {
//     console.log(err);
//   }
// });
// router.delete('/:index', async (req, res) => {
//   try {
//     if (!fs.existsSync(usersUrl)) {
//       throw Error();
//     }
//     const { params } = req;
//     const index = Number(params.index);
//     const users = await readFile(usersUrl);
//     users.splice(index);
//     await writeFile(usersUrl, users);
//   } catch (err) {
//     console.log(err);
//   }
// });
// router.patch('/:index', async (req, res) => {
//   try {
//     const { body, params } = req;
//     const index = Number(params.index);
//     const users = await readFile(usersUrl);
//     for (const key of Object.keys(body)) {
//       console.log(key);
//       if (users[index].hasOwnProperty(key)) {
//         users[index][key] = body[key];
//       }
//     }
//     await writeFile(usersUrl, users);
//     res.send('Hello World');
//   } catch (err) {
//     console.log(err);
//   }
// });

// export default router;
