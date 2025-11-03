import { ElementSelectorElement } from "@/components/inputs/elementSelector";

import { ElementKey } from "./types";

// return true if the length is valid
export const lengthValidate = (
  length: number,
  shortTrashold: number,
  longTrashold: number,
  conditionForShort: boolean,
) => {
  return !conditionForShort ? length <= longTrashold : length <= shortTrashold;
};

// return true if all the images are of different variety
export const imageVarietyValidate = (
  elements: Record<ElementKey, ElementSelectorElement>,
) => {
  const values = Object.entries(elements).map(([, v]) => v.image || "");
  console.log(values);
  return (
    values.filter((item, index) => values.indexOf(item) !== index).length ===
      0 && !values.includes("")
  );
};

export const bgColorsValidate = (arr: string[]) => {
  const seen = new Set();
  for (const item of arr) {
    if (seen.has(item) && item !== "" && item !== "var(--white)") {
      return false; // Duplicate found
    }
    seen.add(item);
  }
  return true; // No duplicates
};

export const uppercaseValidate = (str: string) => {
  return str !== str.toUpperCase() || str === "SFÉRA" || str === "";
};

export const didYouKnowQuestionValidate = (str: string) => {
  return str.includes("?");
};
