export type infer<T> = T extends (...args: any[]) => infer R ? R : never;
