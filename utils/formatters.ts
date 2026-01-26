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

export const addDays = (date: string, days: number): string => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
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

export const removeEmojis = (input: string): string => {
  // Unicode regex to match most emojis
  const emojiRegex =
    /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F1E6}-\u{1F1FF}]/gu;

  // Replace emojis with an empty string
  return input.replace(emojiRegex, "");
};

export const constructFileName = (
  input: string,
  type: string,
  width: number,
  height: number,
  unit: string = "px",
): string => {
  return removeEmojis(
    `SFÉRA_${width}x${height}${unit}_` +
      input
        .split(/[.:,;\-\/\\()[\]{}—]/)[0]
        .replace(/ /g, "-")
        .replace(/[#%&:*!?—↵¶—]/, "")
        .toLowerCase() +
      `-${type}`,
  );
};
