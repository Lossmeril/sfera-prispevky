import { elementSetType } from "./elements";

export type facilityType = {
  name: string;
  nameEn: string;

  colorBgVarName: string;

  elementSet: elementSetType;
};

export const dilnaTextilu: facilityType = {
  name: "Dílna Textilu",
  nameEn: "Textiles Workshop",

  colorBgVarName: "textil",

  elementSet: {
    elementPrefix: "Textil_",
    numberOfElements: 33,
    newTrashhold: 25,
  },
};

export const dilnaGrafiky: facilityType = {
  name: "Dílna Grafiky",
  nameEn: "Graphics Workshop",

  colorBgVarName: "grafika",

  elementSet: {
    elementPrefix: "Grafika_",
    numberOfElements: 30,
    newTrashhold: 25,
  },
};

export const dilnaDreva: facilityType = {
  name: "Dílna Dřeva",
  nameEn: "Wood Workshop",

  colorBgVarName: "drevo",

  elementSet: {
    elementPrefix: "Drevo_",
    numberOfElements: 30,
    newTrashhold: 24,
  },
};

export const dilnaKovu: facilityType = {
  name: "Dílna Kovu/Elektra",
  nameEn: "Metal/Electric Workshop",

  colorBgVarName: "kov",

  elementSet: {
    elementPrefix: "Kov Elektro_",
    numberOfElements: 30,
    newTrashhold: 25,
  },
};

export const laboratorITVR: facilityType = {
  name: "Laboratoř IT/VR",
  nameEn: "Computer Science/VR Lab",

  colorBgVarName: "it",

  elementSet: {
    elementPrefix: "IT_",
    numberOfElements: 32,
    forbiddenElements: [2, 8, 12, 15, 19, 20],
    newTrashhold: 25,
  },
};

export const laboratorFyziky: facilityType = {
  name: "Laboratoř Fyziky",
  nameEn: "Physics Lab",

  colorBgVarName: "fyzika",

  elementSet: {
    elementPrefix: "Fyzika_",
    numberOfElements: 25,
    newTrashhold: 25,
  },
};

export const laboratorChemie: facilityType = {
  name: "Laboratoř Chemie",
  nameEn: "Chemistry Lab",

  colorBgVarName: "chemie",

  elementSet: {
    elementPrefix: "Chemie_",
    numberOfElements: 28,
    forbiddenElements: [15],
    newTrashhold: 25,
  },
};

export const laboratorPrirodopisu: facilityType = {
  name: "Laboratoř Přírodopisu",
  nameEn: "Biology Lab",

  colorBgVarName: "prirodopis",

  elementSet: {
    elementPrefix: "Priroda_",
    numberOfElements: 36,
    newTrashhold: 24,
  },
};

export const sferickeHriste: facilityType = {
  name: "Sférické Hřiště",
  nameEn: "Spherical Playground",

  colorBgVarName: "hriste",

  elementSet: {
    elementPrefix: "Deti_",
    numberOfElements: 27,
    newTrashhold: 25,
  },
};

export const scienceOnSphere: facilityType = {
  name: "Sál Science on a Sphere",
  nameEn: "Science on a Sphere Room",

  colorBgVarName: "sos",

  elementSet: {
    elementPrefix: "Science_Sphere_",
    numberOfElements: 27,
    newTrashhold: 24,
  },
};

export const primestskyTabor: facilityType = {
  name: "Příměstský Tábor",
  nameEn: "Day Camp",

  colorBgVarName: "tabory",

  elementSet: {
    elementPrefix: "",
    numberOfElements: 0,
    newTrashhold: 0,
  },
};

export const kreativniUceni: facilityType = {
  name: "Kreativní Učení",
  nameEn: "Creative Learning",

  colorBgVarName: "kreativniuceni",

  elementSet: {
    elementPrefix: "",
    numberOfElements: 0,
    newTrashhold: 0,
  },
};

export const eduLab: facilityType = {
  name: "AI EduLab @ SFÉRA",
  nameEn: "AI EduLab @ SFERA",

  colorBgVarName: "white",

  elementSet: {
    elementPrefix: "",
    numberOfElements: 0,
    newTrashhold: 0,
  },
};

export const facilities: facilityType[] = [
  dilnaTextilu,
  dilnaGrafiky,
  dilnaDreva,
  dilnaKovu,
  laboratorITVR,
  laboratorFyziky,
  laboratorChemie,
  laboratorPrirodopisu,
  primestskyTabor,
];
