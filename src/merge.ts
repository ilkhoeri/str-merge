import { twMerge } from 'tailwind-merge';
import { cnx, type ClassValue } from './cnx';
export function merge(...merge: ClassValue[]) {
  return twMerge(cnx(...merge));
}
export { merge as cn };
