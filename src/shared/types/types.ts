/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnitTypeShort } from 'dayjs';
import { RequestHandler as RequestHandlerExpress, Request } from 'express';

// * Express types
export type RequestAny = Request<Record<string, string>, any, any, Record<string, any>>;
export type RequestHandler<ResBody = any, ReqBody = any, ReqQuery = ParsedQueryString, Params = Record<string, string>> = RequestHandlerExpress<
  Params,
  ResBody,
  ReqBody,
  ReqQuery
>;
export interface ParsedQueryString {
  [key: string]: undefined | string | string[] | ParsedQueryString | ParsedQueryString[];
}

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

// * Commerce types
export type ExpiriesAfter = `${number}${UnitType}`;
export type TokensExpiriesAfter = `${ExpiriesAfter}:${ExpiriesAfter}`;
