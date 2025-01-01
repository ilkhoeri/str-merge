export type ocxMap = Record<string, any>;
export type ocxKey<T> = T & ocxMap;
export type ocxValue = ocxMap | ocxMap[] | ocxValue[] | string | number | null | boolean | undefined | (() => ocxValue);
export type ocxValues<T> = T | ocxValue | ocxKey<T>;

export function ocx<T extends ocxMap>(...inputs: ocxValues<T>[]): ocxKey<T> {
  return inputs.reduce<ocxKey<T>>((acc, input) => {
    if (!input) return acc;
    if (typeof input === 'function') return { ...acc, ...ocx(input()) };
    if (Array.isArray(input)) return { ...acc, ...ocx(...input) };
    if (typeof input === 'object') return { ...acc, ...input };
    return acc;
  }, {} as ocxKey<T>);
}
