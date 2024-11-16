export const formatDate = (date: string): string => {
  if (!date) return ""; // Handle empty input

  const dateObj = new Date(date); // Parse the date string (YYYY-MM-DD format)

  const formatter = new Intl.DateTimeFormat("cs-CZ", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return formatter.format(dateObj); // Format to "DD. month YYYY"
};
