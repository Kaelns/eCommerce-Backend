export interface IParsedQs {
  [key: string]: undefined | string | string[] | IParsedQs | IParsedQs[];
}
