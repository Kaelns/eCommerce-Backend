import { api } from '@/services/api/v2/index.js';
// import { TokenStore } from '@commercetools/ts-client';
import { asyncHandler } from '@/middlewares/async-handlers.js';
import { BodyUserEmail, BodyUserLogin } from '@/shared/zod/user.schema.js';
import { RequestHandler } from 'express';

export const createUser: RequestHandler = asyncHandler(async (req, res) => {
  /* const response = */ await api.user.createUser(req.body);
  await api.cart.createCart();
  res.status(200).json();
});

type GetUserByEmail = RequestHandler<object, boolean, BodyUserEmail>;

export const getUserByEmail: GetUserByEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const response = await api.user.getUserByEmail(email);
  res.status(200).send(!!response.body.total);
});

type LoginUser = RequestHandler<object, /* TokenStore */ { ok: true }, BodyUserLogin>;

export const loginUser: LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  /* const response = */ await api.user.loginUser(email, password);
  console.log(req.ip);

  // req.session.user = { user: email, password };
  res.cookie('hello', 'World', { maxAge: 1000 });
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
  await api.cart.createCart();
  res.status(200).json({ ok: true });
});
