import { formatDistanceToNow } from 'date-fns';

export const getDistanceNow = ( date: number  ) => {
  const fromNow = formatDistanceToNow( date );
  return `${fromNow} ago`;
}