export type Color = {
  name: string;
  cssVar: string;
};

export const accents: Color[] = [
  {
    cssVar: "var(--white)",
    name: "Bílá",
  },
  {
    cssVar: "var(--accent-red)",
    name: "Červená",
  },
  {
    cssVar: "var(--accent-orange)",
    name: "Oranžová",
  },
  {
    cssVar: "var(--accent-yellow)",
    name: "Žlutá",
  },
  {
    cssVar: "var(--accent-lime)",
    name: "Zelinkavá",
  },
  {
    cssVar: "var(--accent-green)",
    name: "",
  },
  {
    cssVar: "var(--accent-blue)",
    name: "",
  },
  {
    cssVar: "var(--accent-purple)",
    name: "",
  },
  {
    cssVar: "var(--accent-brown)",
    name: "",
  },
  {
    cssVar: "var(--accent-gray)",
    name: "",
  },
];
