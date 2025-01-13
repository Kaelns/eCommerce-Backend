import { api } from '@/services/api/v2/index.js';
import { responceOk } from '@/shared/data/constants.js';
import { safeRequestHandler } from '@/middlewares/safeRequestHandler.js';
import { getSessionTokenStore } from '@/shared/helpers/ecommerceSDK/get/getSessionTokenStore.js';
import { RequestHandler, ResponceOk } from '@/shared/types/types.js';
import { Cart, CartPagedQueryResponse, MyCartUpdateAction } from '@commercetools/platform-sdk';

type CreateCart = RequestHandler<Cart>;

export const createCart: CreateCart = safeRequestHandler(async (req, res) => {
  const tokenStore = getSessionTokenStore(req);
  const cart = await api.cart.createCart(tokenStore);
  res.status(200).json(cart);
});

type GetAllCarts = RequestHandler<CartPagedQueryResponse>;

export const getAllCarts: GetAllCarts = safeRequestHandler(async (req, res) => {
  const tokenStore = getSessionTokenStore(req);
  const cart = await api.cart.getAllCarts(tokenStore);
  res.status(200).json(cart);
});

type GetCartWithId = RequestHandler<Cart, { cartId: string }>;

export const getCartById: GetCartWithId = safeRequestHandler(async (req, res) => {
  const { cartId } = req.body;
  const tokenStore = getSessionTokenStore(req);
  const cart = await api.cart.getCartWithId(tokenStore, cartId);
  res.status(200).json(cart);
});

type UpdateCart = RequestHandler<Cart, { cartId: string; version: string; action: MyCartUpdateAction }>;

export const updateCart: UpdateCart = safeRequestHandler(async (req, res) => {
  const { cartId, version, action } = req.body;
  const tokenStore = getSessionTokenStore(req);
  const cart = await api.cart.updateCart(tokenStore, cartId, +version, action);
  res.status(200).json(cart);
});

type DeleteCart = RequestHandler<ResponceOk, { cartId: string; version: string }>;

export const deleteCart: DeleteCart = safeRequestHandler(async (req, res) => {
  const { cartId, version } = req.body;
  const tokenStore = getSessionTokenStore(req);
  await api.cart.deleteCart(tokenStore, cartId, +version);
  res.status(200).json(responceOk);
});
