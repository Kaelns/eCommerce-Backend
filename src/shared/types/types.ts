export interface ParsedQueryString {
  [key: string]: undefined | string | string[] | ParsedQueryString | ParsedQueryString[];
}

export type NonUndefinedObj<T> = { [P in keyof T]: Exclude<T[P], null | undefined> };
