import { ElementSelectorElement } from "@/components/inputs/elementSelector";

import { ElementKey } from "./types";

type ValidationResult = {
  valid: boolean;
  errors: string[];
};

type Validator<T> = (data: T) => ValidationResult;

// ✅ text existence validator
export const inputValidate = (
  text: string,
  typeOfText: string,
  alternativeDeclension?: string,
): ValidationResult => {
  const valid = text.trim().length > 0;

  const errors: string[] = [];
  if (!valid) {
    errors.push(
      `${typeOfText} musí být ${alternativeDeclension || "vyplněn"}.`,
    );
  }

  return { valid, errors };
};

// ✅ Length validator
export const lengthValidate = (
  length: number,
  shortThreshold: number,
  longThreshold: number,
  conditionForShort: boolean,
): ValidationResult => {
  const valid = !conditionForShort
    ? length <= longThreshold
    : length <= shortThreshold;

  const errors: string[] = [];
  if (!valid) {
    errors.push(
      !conditionForShort
        ? `Délka nesmí přesáhnout ${longThreshold} znaků.`
        : `Délka nesmí přesáhnout ${shortThreshold} znaků.`,
    );
  }

  return { valid, errors };
};

// ✅ Image variety validator
export const imageVarietyValidate = (
  elements: Record<ElementKey, ElementSelectorElement>,
): ValidationResult => {
  const values = Object.entries(elements).map(([, v]) => v.image || "");

  const hasDuplicates =
    values.filter((item, index) => values.indexOf(item) !== index).length > 0;
  const hasEmpty = values.includes("");

  const valid = !hasDuplicates && !hasEmpty;
  const errors: string[] = [];

  if (hasEmpty) errors.push("Všechna pole musí mít vybraný prvek.");
  if (hasDuplicates)
    errors.push("Každý prvek musí být unikátní (žádné duplicity).");

  return { valid, errors };
};

// ✅ Background color variety validator
export const bgColorsValidate = (
  elements: Record<ElementKey, ElementSelectorElement>,
): ValidationResult => {
  const values = Object.entries(elements).map(([, v]) => v.bg || "");

  const hasDuplicates =
    values.filter((item, index) => values.indexOf(item) !== index).length > 0;
  const hasEmpty = values.includes("");

  const valid = !hasDuplicates && !hasEmpty;
  const errors: string[] = [];

  if (hasEmpty) errors.push("Všechna pole musí mít vybranou barvu pozadí.");
  if (hasDuplicates)
    errors.push("Každá barva pozadí musí být unikátní (žádné duplicity).");

  return { valid, errors };
};

export function validate<T>(options: {
  data: T;
  validators: Validator<T>[];
}): ValidationResult {
  const { data, validators } = options;
  const allErrors: string[] = [];

  for (const validator of validators) {
    const result = validator(data);
    if (!result.valid) allErrors.push(...result.errors);
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
  };
}
