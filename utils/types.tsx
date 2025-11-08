export type ElementKey = `element${number}`;

// --------------------------------
// API types
// --------------------------------
export type Facility = {
  id: number;
  name: string;
  nameEn: string;
  colorBg: string;
  elementSet: ElementSet;
};

export type ElementSet = {
  id: number;
  name: string;
  elementCode: string;
  facility?: {
    id: number;
    name: string;
    nameEn: string;
    colorBg: string;
  } | null;
  elements: {
    id: number;
    name: string;
    variants: {
      size: "low" | "medium" | "high";
      url: string;
      contentType: string;
    }[];
  }[];
};

export type Color = {
  id: number;
  name: string;
  nameSimple: string;

  hex: string;
  rgb: string;
  cmyk: string;
};
