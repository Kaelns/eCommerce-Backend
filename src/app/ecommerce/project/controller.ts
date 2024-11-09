import expressAsyncHandler from 'express-async-handler';
import { api } from '@/services/api/v2/index.js';
import { RequestHandler } from 'express';
import { ClientResponse, Project } from '@commercetools/platform-sdk';

type GetProducts = RequestHandler<object, ClientResponse<Project>>;

export const getProject: GetProducts = expressAsyncHandler(async (_req, res) => {
  // TODO Convert to safe obj
  const response = await api.getProject();
  res.status(200).json(response);
});
