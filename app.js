import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRouter from './api/user/router.js';
import productRouter from './api/product/router.js';

mongoose.connect('mongodb+srv://root:root@redbull.vql9r.mongodb.net/redbull?retryWrites=true&w=majority');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/user', userRouter);
app.use('/product', productRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.setHeader('Content-Type', 'application/json');

  res.status(500).send({
    status: 'server error',
    message: err.message,
  });
});

export default app;
