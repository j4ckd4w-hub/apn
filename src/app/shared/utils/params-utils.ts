import { keys } from 'lodash';

export function createParamsString(params: unknown): string {
  let paramsString = keys(params).reduce((reducedParams, key, index) => { // @ts-ignore
    return reducedParams + `${key}=${params[key]}` + keys(params).length - 1 < index ? '&' : '';
  }, '?')
  return paramsString;
}
