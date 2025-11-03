import { ElementSelectorElement } from "@/components/inputs/elementSelector";

import { ElementKey } from "./types";

type ValidationResult = {
  valid: boolean;
  errors: string[];
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

// ✅ SFÉRA capitalization validator
export const sferaCapitalizationValidate = (
  text: string,
): {
  valid: boolean;
  errors: string[];
} => {
  const normalized = text.normalize("NFC");
  const errors: string[] = [];

  // Regex patterns
  const sferaPattern = /\bSFÉR(A|Y|U|OU|O|E|AMI|ÁM|ÁCH)\b/g;
  const lowercaseSferaPattern =
    /\b(sféra|sféry|sféře|sféru|sférou|sférách|sférami|sférám)\b/g;
  const mixedCaseSferaPattern = /\b[Ss]f[ée]r[a-zá-ž]+\b/g;

  const sphericalUpperPattern = /\bSFÉRICK(Ý|Á|É|ÉHO|ÉMU|ÝM|OU|ÝCH|ÝMI|ÉM)?\b/g;
  const sferanUpperPattern = /\bSFÉŘAN(A|I|Y|OVI|EM|ŮM|ECH)?\b/g;

  // Lowercase exceptions (allowed)
  const sphericalLowerPattern = /\bsférick(ý|á|é|ého|ému|ým|ou|ých|ými|ém)?\b/g;
  const sferanLowerPattern = /\bsféřan(a|i|y|ovi|em|ům|ech)?\b/g;

  // Rule 1: SFÉRA and declensions must be fully uppercase
  if (
    normalized.match(lowercaseSferaPattern) ||
    normalized.match(mixedCaseSferaPattern)
  ) {
    errors.push(
      "Slovo „SFÉRA“ (včetně skloňování) musí být psáno verzálkami – např. SFÉŘE, SFÉRY, SFÉROU.",
    );
  }

  // Rule 2: "sférický" must *not* be uppercase
  if (normalized.match(sphericalUpperPattern)) {
    errors.push(
      "Přídavné jméno „sférický“ (a jeho tvary) se píše s malým písmenem.",
    );
  }

  // Rule 3: "sféřan" must *not* be uppercase
  if (normalized.match(sferanUpperPattern)) {
    errors.push(
      "Podstatné jméno „sféřan“ (a jeho tvary) se píše s malým písmenem.",
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
