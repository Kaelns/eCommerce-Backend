import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
// import session from 'express-session';
import cookieParser from 'cookie-parser';
import { router } from '@/router.js';
import { corsOptions } from '@/shared/config/corsOptions.js';
import { morganChalk } from '@/middlewares/morganChalk.js';
import { errorHandler } from '@/middlewares/errorHandler.js';
// import { sessionOptions } from '@/shared/config/sessionOptions.js';
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

  /*   if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sessionOptions.cookie!.secure = true;
  }

  app.use(session(sessionOptions)); */

  app.use(router);

  app.all('/*', notFoundLogger);
  app.use(errorHandler);

  return app;
}

const PORT = process.env.PORT ?? '5000';

startApp().listen(PORT, appListenerLogger(PORT));
