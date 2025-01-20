// return true if the length is valid
export const lengthValidate = (
  length: number,
  shortTrashold: number,
  longTrashold: number,
  conditionForShort: boolean
) => {
  return !conditionForShort ? length <= longTrashold : length <= shortTrashold;
};

// return true if enough images is uploaded
export const imageUploadValidate = (
  noOfImages: number,
  image1: File | null,
  image2?: File | null,
  image3?: File | null,
  image4?: File | null
) => {
  return (
    image1 &&
    (noOfImages >= 2 ? image2 : true) &&
    (noOfImages >= 3 ? image3 : true) &&
    (noOfImages >= 4 ? image4 : true)
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
