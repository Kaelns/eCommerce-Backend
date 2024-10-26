import { errorHandler } from '@/middlewares/errorHandler';
import { morganChalk } from '@/middlewares/morganChalk';
import { baseRouter } from '@/routes/base.route';
import { productsRouter } from '@/routes/ecommerce/products.route';
import { userRouter } from '@/routes/ecommerce/user.route';
import chalk from 'chalk';
import express from 'express';

function start() {
  const PORT = process.env.PORT || 5000;
  const app = express();

  app.use(morganChalk);
  app.use(express.json());

  app.use('/', baseRouter);
  app.use('/users', userRouter);
  app.use('/products', productsRouter);

  app.all('/*', (_, res) => {
    res.status(200).json({ message: 'Not found' });
  });

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(chalk.cyan('Listening on ') + chalk.yellowBright(PORT) + '\n');
  });
}

start();
