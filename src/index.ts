import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { baseRouter } from '@/app/base.route.js';
import { productsRouter } from '@/app/ecommerce/products/index.js';
import { userRouter } from '@/app/ecommerce/user/index.js';
import { errorHandler } from '@/middlewares/errorHandler.js';
import { morganChalk } from '@/middlewares/morganChalk.js';
import { corsOptions } from '@/shared/corsOptions.js';
import { Routes } from '@/shared/enums.js';
import { notFoundLogger, appListenerLogger } from '@/shared/loggers.js';

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
