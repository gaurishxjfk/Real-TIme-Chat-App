export function getLastSeenText(lastSeen: Date): string {
  // Check if the date is invalid
  if (isNaN(lastSeen.getTime())) return ""; 
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

  export const formatLastActive = (lastActiveAt: string | Date) => {
    const date = new Date(lastActiveAt);
    const now = new Date();
  
    // Check if the date is today
    const isToday = date.getDate() === now.getDate() &&
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear();
  
    if (isToday) {
      // If it's today, return the time in HH:mm format
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      // If it's a past date, return it in dd/mm/yy format
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
      const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
      return `${day}/${month}/${year}`;
    }
  };


  
  export function sortDataByDate(arr: any[]) {
    return arr.sort((a, b) => {
      // If 'a' or 'b' doesn't have 'createdAt', move them to the end
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;
  
      // If both have 'createdAt', sort by date in descending order
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
  
  