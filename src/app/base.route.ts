import { zodValidate } from '@/middlewares/zodValidate.js';
import express from 'express';
import { z } from 'zod';

const baseRouter = express.Router();

const ApiScheme = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email().min(5),
  data: z.object({
    shippingAddress: z.string(),
    billingAddress: z.string()
  })
});

baseRouter
  .route('/')
  .get((_, res, next) => {
    try {
      throw new Error('Params not valid');
      const message = `Server is ongoing on ${process.env.PORT} with ${process.env.PROJECT_KEY} on mode ${process.env.NODE_ENV}`;
      res.status(200).send({ message });
    } catch (err) {
      next(err);
    }
  })
  .post(zodValidate(ApiScheme), (req, res, next) => {
    try {
      console.log(req.body);
      const message = `Server is ongoing on ${process.env.PORT}`;
      res.status(200).send({ message });
    } catch (err) {
      next(err);
    }
  });

baseRouter.route('/:key').get((req, res) => {
  if (req.params.key !== 'test') {
    throw new Error('Params not valid');
  }
  res.status(200).json({ message: 'All is Ok' });
});

export { baseRouter };
