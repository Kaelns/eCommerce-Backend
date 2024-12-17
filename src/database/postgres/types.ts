/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import { UserTokensExpiriesAfter } from '@/shared/types/types.js';
import type { ColumnType } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U> ? ColumnType<S, I | undefined, U> : ColumnType<T, T | undefined, T>;

export type Json = JsonValue;

export type JsonArray = JsonValue[];

export interface JsonObject {
  [x: string]: JsonValue | undefined;
}

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

// * Manually edited CommerceUser expiresAfter type
export interface CommerceUser {
  accessToken: string;
  email: string;
  expiresAfter: Generated<UserTokensExpiriesAfter>;
  refreshToken: string;
  updatedAt: Generated<Timestamp>;
  userId: Generated<number>;
}

export interface Session {
  expire: Timestamp;
  sess: Json;
  sid: string;
}

export interface DB {
  commerceUser: CommerceUser;
  session: Session;
}