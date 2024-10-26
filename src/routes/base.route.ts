import express from 'express';

const baseRouter = express.Router();

baseRouter
  .route('/')
  .get((_, res) => {
    const message = `Server is ongoing on ${process.env.PORT} with ${process.env.PROJECT_KEY} on mode ${process.env.NODE_ENV}`;
    res.status(200).send({ message });
  })
  .post((req, res) => {
    console.log(req.body);
    const message = `Server is ongoing on ${process.env.PORT}`;
    res.status(200).send({ message });
  });

export { baseRouter };
