import { api } from '@/services/api/v2/index.js';
import { asyncHandler } from '@/middlewares/async-handlers.js';
import { RequestHandler } from 'express';
import { ClientResponse, Project } from '@commercetools/platform-sdk';

type GetProducts = RequestHandler<object, ClientResponse<Project>>;

export const startSession: GetProducts = asyncHandler(async (_req, res) => {
  // TODO Check authorized user or not ( middleware )
  // TODO Convert to safe obj
  const response = await api.user.createAnonymousUser();
  console.log(response.tokenStore);

  // TODO handle tokens
  // TODO set cookies
  res.status(200).json(response);
});
