export interface ParsedQueryString {
  [key: string]: undefined | string | string[] | ParsedQueryString | ParsedQueryString[];
}
