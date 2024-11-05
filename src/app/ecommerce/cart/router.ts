import express from 'express';

const cartRouter = express.Router();

cartRouter.get('/');
cartRouter.get('/categories');
cartRouter.get('/:id');

export { cartRouter };
