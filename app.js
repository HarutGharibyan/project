import express from 'express';
import userRouter from './api/user/router.js';
import productRouter from './api/product/router.js';

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/product', productRouter);

export default app;
