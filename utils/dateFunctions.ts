import { formatDistanceToNow } from 'date-fns';

export const formatDistance = (date: string) => {
    const dateFormat2 = new Date(JSON.parse(date));
    const fromNow = formatDistanceToNow(dateFormat2);
    return fromNow;
};

export const getDistanceNow = ( date: number  ) => {
  const fromNow = formatDistanceToNow( date );
  return `${fromNow} ago`;
};