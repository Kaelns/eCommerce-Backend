export interface IParsedQueryString {
  [key: string]: undefined | string | string[] | IParsedQueryString | IParsedQueryString[];
}
