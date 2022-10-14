import { formatDistanceToNow } from 'date-fns';

<<<<<<< HEAD
export const getDistanceNow = ( date: number  ) => {
=======
export const getFormatDistanceToNow = ( date: number  ) => {
>>>>>>> 92e1f8782ac134e61c99edc0bf7a14be500f207c
  const fromNow = formatDistanceToNow( date );
  return `${fromNow} ago`;
}