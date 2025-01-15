/* eslint-disable @typescript-eslint/no-explicit-any */
import core from 'express-serve-static-core';
import { UnitTypeShort } from 'dayjs';
import { RequestHandler as RequestHandlerExpress, Request, Response } from 'express';

// * Express types
export type RequestAny = Request<Record<string, string>, any, any, Record<string, any>>;
export interface ParsedQueryString {
  [key: string]: undefined | string | string[] | ParsedQueryString | ParsedQueryString[];
}
export type RequestHandler<ResBody = any, ReqBody = any, ReqQuery = ParsedQueryString, Params = Record<string, string>> = RequestHandlerExpress<
  Params,
  ResBody,
  ReqBody,
  ReqQuery
>;

// * General types
export type UnitType = UnitTypeShort | 'w';
export type NonUndefinedObj<T> = { [P in keyof T]: Exclude<T[P], null | undefined> };
export interface ResponceOk {
  ok: boolean;
}
export interface AppData {
  countries: Record<string, string>;
  currencies: string[];
  isUserLogged: boolean;
  countriesWithoutPostal?: Record<string, string>;
}

export type SafeRequestErrorHandler<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = core.Query> = (
  req: Request<P, ResBody, ReqBody, ReqQuery, Record<string, any>>,
  res: Response<ResBody, Record<string, any>>,
  handler: RequestHandlerExpress<P, ResBody, ReqBody, ReqQuery>,
  error?: unknown
) => void | Promise<void>;

// * Commerce types
export type ExpiriesAfter = `${number}${UnitType}`;
export type TokensExpiriesAfter = `${ExpiriesAfter}:${ExpiriesAfter}`;
