import {
  dilnaDreva,
  dilnaGrafiky,
  dilnaKovu,
  dilnaTextilu,
  laboratorChemie,
  laboratorFyziky,
  laboratorITVR,
  laboratorPrirodopisu,
  scienceOnSphere,
  sferickeHriste,
} from "./facilities";

export type elementSetType = {
  name: string;
  elementPrefix: string;
  numberOfElements: number;
};

const baseElementSets: elementSetType[] = [
  {
    name: dilnaTextilu.name,
    elementPrefix: "Textil_",
    numberOfElements: 33,
  },
  {
    name: dilnaGrafiky.name,
    elementPrefix: "Grafika_",
    numberOfElements: 30,
  },
  {
    name: dilnaDreva.name,
    elementPrefix: "Drevo_",
    numberOfElements: 30,
  },
  {
    name: dilnaKovu.name,
    elementPrefix: "Kov Elektro_",
    numberOfElements: 30,
  },
  {
    name: laboratorITVR.name,
    elementPrefix: "IT_",
    numberOfElements: 32,
  },
  {
    name: laboratorFyziky.name,
    elementPrefix: "Fyzika_",
    numberOfElements: 25,
  },
  {
    name: laboratorChemie.name,
    elementPrefix: "Chemie_",
    numberOfElements: 28,
  },
  {
    name: laboratorPrirodopisu.name,
    elementPrefix: "Priroda_",
    numberOfElements: 36,
  },
  {
    name: sferickeHriste.name,
    elementPrefix: "Deti_",
    numberOfElements: 27,
  },
  {
    name: scienceOnSphere.name,
    elementPrefix: "Science_Sphere_",
    numberOfElements: 27,
  },
  {
    name: "Miscellaneous (smíšené)",
    elementPrefix: "Misc_",
    numberOfElements: 7,
  },
];

const unique: elementSetType[] = [];

export const elementSets = baseElementSets.concat(unique);
