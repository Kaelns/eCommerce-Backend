import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import cookieParser from 'cookie-parser';
import { Routes } from '@/shared/data/enums.js';
import { baseRouter } from '@/app/base.route.js';
import { userRouter } from '@/app/ecommerce/user/index.js';
import { morganChalk } from '@/middlewares/morganChalk.js';
import { errorHandler } from '@/middlewares/errorHandler.js';
import { corsOptions } from '@/shared/config/corsOptions.js';
import { projectRouter } from '@/app/ecommerce/project/router.js';
import { productsRouter } from '@/app/ecommerce/products/index.js';
import { notFoundLogger, appListenerLogger } from '@/shared/loggers.js';
// import { UserCredentialsSchema } from '@/shared/zod/user.schema.js';
// import { z } from 'zod';

function startApp() {
  const app = express();

  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(morganChalk);
  app.use(cookieParser());
  app.use(express.json());

  app.use(Routes.BASE, baseRouter);
  app.use(Routes.PROJECT, projectRouter);
  app.use(Routes.USERS, userRouter);
  app.use(Routes.PRODUCTS, productsRouter);

  app.all('/*', notFoundLogger);

  app.use(errorHandler);

  return app;
}

const PORT = process.env.PORT ?? '5000';

startApp().listen(PORT, appListenerLogger(PORT));

// const elem = UserCredentialsSchema.safeParse({
//   firstName: 'Yura',
//   lastName: 'Ahanouski',
//   email: 'uraaru@live.com',
//   password: 'Caramba228',
//   dateOfBirth: '2000/03/23#?>',
//   addresses: [
//     {
//       country: 'Belarus',
//       city: 'Minsk',
//       streetName: 'Baltijskaia',
//       streetNumber: '4',
//       apartment: '82',
//       postalCode: '220028'
//     }
//   ],
//   shippingAddresses: [1]
// });

// console.log({ message: elem?.error?.issues ?? 'All good', data: elem.data });
