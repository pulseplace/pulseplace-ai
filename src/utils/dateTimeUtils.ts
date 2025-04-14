import { format, formatDistanceToNow, formatRelative, isToday, isYesterday } from 'date-fns';

/**
 * Formats a date to a human-readable relative time
 */
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isToday(dateObj)) {
    return `Today at ${format(dateObj, 'h:mm a')}`;
  }
  
  if (isYesterday(dateObj)) {
    return `Yesterday at ${format(dateObj, 'h:mm a')}`;
  }
  
  // If it's within the last week, show day and time
  const diffInDays = Math.floor((new Date().getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));
  if (diffInDays < 7) {
    return formatRelative(dateObj, new Date());
  }
  
  // Otherwise, show full date
  return format(dateObj, 'MMM d, yyyy');
};

/**
 * Formats a date to a full timestamp
 */
export const formatTimestamp = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM d, yyyy • h:mm a');
};

/**
 * Formats a date to "time ago" (e.g. "2 hours ago")
 */
export const formatTimeAgo = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

/**
 * Formats a date range to a string
 */
export const formatDateRange = (startDate: Date, endDate: Date): string => {
  const isSameYear = startDate.getFullYear() === endDate.getFullYear();
  const isSameMonth = isSameYear && startDate.getMonth() === endDate.getMonth();
  
  if (isSameMonth) {
    return `${format(startDate, 'MMMM d')} - ${format(endDate, 'd, yyyy')}`;
  } else if (isSameYear) {
    return `${format(startDate, 'MMMM d')} - ${format(endDate, 'MMMM d, yyyy')}`;
  } else {
    return `${format(startDate, 'MMMM d, yyyy')} - ${format(endDate, 'MMMM d, yyyy')}`;
  }
};
