export function getLastSeenText(lastSeen: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - lastSeen.getTime()) / 1000);
  
    if (diffInSeconds < 60) {
      return "Online";
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else {
      const diffInWeeks = Math.floor(diffInSeconds / 604800);
      return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
    }
  }

  export function formatTo12HourTime(isoString: string | Date): string {
    const date = new Date(isoString);
  
    // Format time in 12-hour format with AM/PM
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  }
  