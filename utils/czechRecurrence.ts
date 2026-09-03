// --------------------------------------------------------------------------
// Grammatically correct Czech recurrence phrases built from a few UI inputs.
//
// The user never types the string. They pick a frequency and one or more
// weekdays; this module assembles a phrase that is valid Czech, e.g.:
//
//   každý čtvrtek
//   každou lichou neděli
//   každou první sobotu v měsíci
//   každé pondělí, každou středu a každý pátek
//   každou první sobotu a každou první neděli v měsíci
//
// The tricky part is agreement: the quantifier "každý" and the frequency
// adjective both agree in GENDER and CASE with the weekday noun, and the
// whole phrase is in the temporal accusative ("chodím tam každou středu").
// --------------------------------------------------------------------------

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type Frequency =
  | "every" // každý týden
  | "odd" // každý lichý týden
  | "even" // každý sudý týden
  | "first" // první v měsíci
  | "second"
  | "third"
  | "fourth"
  | "last";

type Gender = "m" | "f" | "n";

interface DayGrammar {
  key: DayKey;
  /** Nominative — used for UI labels. */
  nominative: string;
  /** Short UI label. */
  short: string;
  /** Accusative singular — the form that appears in the phrase. */
  accusative: string;
  gender: Gender;
}

// Ordered Monday→Sunday so multi-day output always reads in week order.
export const DAYS: readonly DayGrammar[] = [
  {
    key: "mon",
    nominative: "pondělí",
    short: "Po",
    accusative: "pondělí",
    gender: "n",
  },
  {
    key: "tue",
    nominative: "úterý",
    short: "Út",
    accusative: "úterý",
    gender: "n",
  },
  {
    key: "wed",
    nominative: "středa",
    short: "St",
    accusative: "středu",
    gender: "f",
  },
  {
    key: "thu",
    nominative: "čtvrtek",
    short: "Čt",
    accusative: "čtvrtek",
    gender: "m",
  },
  {
    key: "fri",
    nominative: "pátek",
    short: "Pá",
    accusative: "pátek",
    gender: "m",
  },
  {
    key: "sat",
    nominative: "sobota",
    short: "So",
    accusative: "sobotu",
    gender: "f",
  },
  {
    key: "sun",
    nominative: "neděle",
    short: "Ne",
    accusative: "neděli",
    gender: "f",
  },
] as const;

// "každý" in the accusative singular.
const QUANTIFIER_ACC: Record<Gender, string> = {
  m: "každý",
  f: "každou",
  n: "každé",
};

// Frequency adjective in the accusative singular, per gender.
// Soft adjectives (první, třetí, poslední) are identical in every gender.
const MODIFIER_ACC: Record<
  Exclude<Frequency, "every">,
  Record<Gender, string>
> = {
  odd: { m: "lichý", f: "lichou", n: "liché" },
  even: { m: "sudý", f: "sudou", n: "sudé" },
  first: { m: "první", f: "první", n: "první" },
  second: { m: "druhý", f: "druhou", n: "druhé" },
  third: { m: "třetí", f: "třetí", n: "třetí" },
  fourth: { m: "čtvrtý", f: "čtvrtou", n: "čtvrté" },
  last: { m: "poslední", f: "poslední", n: "poslední" },
};

// Frequencies that scope to a calendar month get a trailing "v měsíci".
const IN_MONTH: ReadonlySet<Frequency> = new Set<Frequency>([
  "first",
  "second",
  "third",
  "fourth",
  "last",
]);

// Labels for the frequency <select>.
export const FREQUENCY_LABELS: Record<Frequency, string> = {
  every: "Každý týden",
  odd: "Každý lichý týden",
  even: "Každý sudý týden",
  first: "První v měsíci",
  second: "Druhý v měsíci",
  third: "Třetí v měsíci",
  fourth: "Čtvrtý v měsíci",
  last: "Poslední v měsíci",
};

export const FREQUENCY_ORDER: readonly Frequency[] = [
  "every",
  "odd",
  "even",
  "first",
  "second",
  "third",
  "fourth",
  "last",
] as const;

const dayByKey = (key: DayKey): DayGrammar =>
  DAYS.find((d) => d.key === key) as DayGrammar;

/** "každou první sobotu" — the per-day phrase without the trailing "v měsíci". */
const phraseForDay = (day: DayGrammar, frequency: Frequency): string => {
  const quantifier = QUANTIFIER_ACC[day.gender];
  if (frequency === "every") return `${quantifier} ${day.accusative}`;
  const modifier = MODIFIER_ACC[frequency][day.gender];
  return `${quantifier} ${modifier} ${day.accusative}`;
};

/** Join phrases with commas and a final "a": "a, b a c". */
const joinCzech = (parts: string[]): string => {
  if (parts.length <= 1) return parts.join("");
  return `${parts.slice(0, -1).join(", ")} a ${parts[parts.length - 1]}`;
};

/**
 * Build the full Czech recurrence phrase.
 *
 * @param frequency  chosen frequency
 * @param dayKeys    one or more selected weekdays (any order)
 * @returns the phrase, or "" when no day is selected
 */
export const buildRecurrenceString = (
  frequency: Frequency,
  dayKeys: DayKey[],
): string => {
  const selected = DAYS.filter((d) => dayKeys.includes(d.key));
  if (selected.length === 0) return "";

  const phrase = joinCzech(selected.map((d) => phraseForDay(d, frequency)));
  return IN_MONTH.has(frequency) ? `${phrase} v měsíci` : phrase;
};

/** Full weekday name in the nominative — for aria labels. */
export const dayNominative = (key: DayKey): string => dayByKey(key).nominative;
