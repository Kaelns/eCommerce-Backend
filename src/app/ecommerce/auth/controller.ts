import { api } from '@/services/api/v2/index.js';
import { asyncHandler } from '@/middlewares/async-handlers.js';
import { RequestHandler } from 'express';
import { ClientResponse, Project } from '@commercetools/platform-sdk';
import { BodyUserLogin } from '@/shared/zod/user.schema.js';

type GetProducts = RequestHandler<object, ClientResponse<Project>>;

export const startSession: GetProducts = asyncHandler(async (_req, res) => {
  // TODO Check authorized user or not ( middleware ). If no - send project settings
  // TODO Convert to safe obj
  const response = await api.user.createAnonymousUser();
  console.log(response.tokenStore);

  // TODO handle tokens
  // TODO set cookies
  // TODO Send project settings
  res.status(200).json(response);
});

type LoginUser = RequestHandler<object, /* TokenStore */ { ok: true }, BodyUserLogin>;

export const loginUser: LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  /* const response = */ await api.user.loginUser(email, password);
  console.log(req.ip);

  // req.session.user = { user: email, password };
  res.status(200).json(/* response */ { ok: true });
});

/* import "express-session";
declare module "express-session" {
  interface SessionData {
    user: string;
  }
} */

type LogoutUser = RequestHandler<object, { ok: true }>;

export const logoutUser: LogoutUser = asyncHandler(async (req, res) => {
  console.log(req.cookies.hello);
  await api.user.logoutUser();
  res.status(200).json({ ok: true });
});
