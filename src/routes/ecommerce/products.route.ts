import express from 'express';

const productsRouter = express.Router();

productsRouter.get('/');
productsRouter.get('/categories');
productsRouter.get('/:id');

export { productsRouter };
