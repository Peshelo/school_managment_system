const dateUtils = {
  formatDate(date) {
    let dateString;
    if (Array.isArray(date)) {
      // Convert array to YYYYMMDD string
      const [year, month, day] = date;
      dateString = `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
    } else {
      dateString = date;
    }

    // Ensure the date string is 8 characters long
    if (dateString.length !== 8) {
      throw new Error('Date string must be in YYYYMMDD format');
    }

    // Extract year, month, and day from the date string
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    // Create a new Date object using the extracted values
    const dateObj = new Date(year, month - 1, day);

    // Format the date using toLocaleDateString
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);

    return formattedDate;
  }
};

export default dateUtils;
