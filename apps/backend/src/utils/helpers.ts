// src/utils/helpers.ts
export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> =>
  keys.reduce((acc, k) => (k in obj ? { ...acc, [k]: obj[k] } : acc), {} as Pick<T, K>);

export const toBool = (v: any) => v === true || v === "true";
