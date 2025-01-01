import { twMerge } from 'tailwind-merge';
import { cnx, type cnxValues } from './cnx';
export function merge(...merge: cnxValues[]) {
  return twMerge(cnx(...merge));
}
export { merge as cn };
