import expressAsyncHandler from 'express-async-handler';
import { api } from '@/services/api/v2/index.js';
import { TokenStore } from '@commercetools/ts-client';
import { BodyUserEmail, BodyUserLogin } from '@/shared/zod/user.schema.js';
import { RequestHandler } from 'express';
import { ClientResponse, CustomerPagedQueryResponse } from '@commercetools/platform-sdk';

export const createUser: RequestHandler = expressAsyncHandler(async (req, res) => {
  /* const response = */ await api.user.createUser(req.body);
  res.status(200).json();
});

type GetUserByEmail = RequestHandler<object, boolean, BodyUserEmail>;

export const getUserByEmail: GetUserByEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  const response = await api.user.getUserByEmail(email);
  res.status(200).send(!!response.body.total);
});

type LoginUser = RequestHandler<object, TokenStore, BodyUserLogin>;

export const loginUser: LoginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const response = await api.user.loginUser(email, password);
  res.status(200).json(response);
});

type LogoutUser = RequestHandler<object, ClientResponse<CustomerPagedQueryResponse>>;

export const logoutUser: LogoutUser = expressAsyncHandler(async (req, res) => {
  const response = await api.user.getUserByEmail(req.body);
  res.status(200).json(response);
});
