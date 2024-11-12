import { startSession } from '@/app/ecommerce/auth/controller.js';
import express from 'express';

const projectRouter = express.Router();

projectRouter.get('/', startSession);

export { projectRouter };
