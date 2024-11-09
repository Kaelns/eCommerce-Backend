import { getProject } from '@/app/ecommerce/project/controller.js';
import express from 'express';

const projectRouter = express.Router();

projectRouter.get('/', getProject);

export { projectRouter };
