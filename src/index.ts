import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from '@/middlewares/errorHandler.middleware';
import { morganChalk } from '@/middlewares/morganChalk.middleware';
import { baseRouter } from '@/app/base.route';
import { corsOptions } from '@/shared/corsOptions';
import { Routes } from '@/shared/enums';
import { userRouter } from '@/app/ecommerce/user';
import { productsRouter } from '@/app/ecommerce/products';
import { appListenerLogger, notFoundLogger } from '@/shared/loggers';

export function startApp() {
  const app = express();

  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(morganChalk);
  app.use(express.json());

  app.use(Routes.BASE, baseRouter);
  app.use(Routes.USERS, userRouter);
  app.use(Routes.PRODUCTS, productsRouter);

  app.all('/*', notFoundLogger);

  app.use(errorHandler);

  return app;
}

const PORT = process.env.PORT ?? '5000';

startApp().listen(PORT, appListenerLogger(PORT));
