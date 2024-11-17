export const formatDate = (date: string): string => {
  if (!date) return "";

  const dateObj = new Date(date);

  const formatter = new Intl.DateTimeFormat("cs-CZ", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return formatter.format(dateObj);
};

export const formatTime = (time: string): string => {
  if (!time) return "";

  console.log(time);
  const dateObj = new Date(new Date().toDateString() + " " + time);

  const formatter = new Intl.DateTimeFormat("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
  });

  console.log(dateObj);
  return formatter.format(dateObj).replace(":", ".");
};
