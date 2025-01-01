type ExcludeKeys = 'defaultVariants' | '';
type Undefined<T> = T extends undefined ? never : T;

export type cvxProps<T extends (...keys: any) => any> = Omit<Undefined<Parameters<T>[0]>, ExcludeKeys>;
export type cvxMap = { [key: string]: { [key: string]: string } };
export type cvxVariant<T extends cvxMap> = { [K in keyof T]?: keyof T[K] };
export type cvxKeys<T extends cvxMap> = {
  assign?: string;
  variants: T;
  defaultVariants?: cvxVariant<T>;
};

export function cvx<T extends cvxMap>(keys: cvxKeys<T>) {
  return (variant: cvxVariant<T> = {}) => {
    const mergedVariant = { ...keys.defaultVariants, ...variant } as {
      [K in keyof T]?: keyof T[K];
    };
    const variantsValue = Object.keys(keys.variants)
      .map(key => {
        const variantKey = mergedVariant[key as keyof T] || keys.defaultVariants?.[key as keyof T];
        return variantKey ? keys.variants[key as keyof T][variantKey as keyof T[keyof T]] : undefined;
      })
      .filter(Boolean)
      .join(' ');
    return keys.assign ? [keys.assign, variantsValue].join(' ') : variantsValue;
  };
}
