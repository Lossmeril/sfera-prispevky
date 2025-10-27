export type Color = {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
};

export const accentColors: { [key: string]: Color } = {
  red: {
    name: "Red",
    hex: "#E03C31",
    rgb: "224, 60, 49",
    cmyk: "0, 73, 78, 12",
  },
  blue: {
    name: "Blue",
    hex: "#0072CE",
    rgb: "0, 114, 206",
    cmyk: "100, 56, 0, 0",
  },
  green: {
    name: "Green",
    hex: "#39B54A",
    rgb: "57, 181, 74",
    cmyk: "75, 0, 100, 0",
  },
  yellow: {
    name: "Yellow",
    hex: "#FBB03B",
    rgb: "251, 176, 59",
    cmyk: "0, 30, 95, 0",
  },
};
