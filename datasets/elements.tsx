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
    elementPrefix: "Dřevo_",
    numberOfElements: 30,
  },
  {
    name: dilnaKovu.name,
    elementPrefix: "Kov Elektro_",
    numberOfElements: 30,
  },
  {
    name: laboratorITVR.name,
    elementPrefix: "IT VR_",
    numberOfElements: 35,
  },
  {
    name: laboratorFyziky.name,
    elementPrefix: "Fyzika_",
    numberOfElements: 30,
  },
  {
    name: laboratorChemie.name,
    elementPrefix: "Chemie_",
    numberOfElements: 29,
  },
  {
    name: laboratorPrirodopisu.name,
    elementPrefix: "Přírodopis_",
    numberOfElements: 36,
  },
  {
    name: sferickeHriste.name,
    elementPrefix: "Hřiště_",
    numberOfElements: 27,
  },
  {
    name: scienceOnSphere.name,
    elementPrefix: "SOS_",
    numberOfElements: 27,
  },
  {
    name: "Miscellaneous (smíšené)",
    elementPrefix: "Misc_",
    numberOfElements: 9,
  },
];

const unique: elementSetType[] = [];

export const elementSets = baseElementSets.concat(unique);
