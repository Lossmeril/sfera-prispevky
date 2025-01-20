export type facilityType = {
  id: number;
  name: string;
  nameEn: string;

  colorBgVarName: string;
};

export const dilnaTextilu: facilityType = {
  id: 1,
  name: "Dílna Textilu",
  nameEn: "Textiles Workshop",

  colorBgVarName: "textil",
};

export const dilnaGrafiky: facilityType = {
  name: "Dílna Grafiky",
  nameEn: "Graphics Workshop",

  colorBgVarName: "grafika",
  id: 2,
};

export const dilnaDreva: facilityType = {
  name: "Dílna Dřeva",
  nameEn: "Wood Workshop",

  colorBgVarName: "drevo",
  id: 3,
};

export const dilnaKovu: facilityType = {
  name: "Dílna Kovu/Elektra",
  nameEn: "Metal/Electric Workshop",

  colorBgVarName: "kov",
  id: 4,
};

export const laboratorITVR: facilityType = {
  name: "Laboratoř IT/VR",
  nameEn: "Computer Science/VR Lab",

  colorBgVarName: "it",
  id: 5,
};

export const laboratorFyziky: facilityType = {
  name: "Laboratoř Fyziky",
  nameEn: "Physics Lab",

  colorBgVarName: "fyzika",
  id: 6,
};

export const laboratorChemie: facilityType = {
  name: "Laboratoř Chemie",
  nameEn: "Chemistry Lab",

  colorBgVarName: "chemie",
  id: 7,
};

export const laboratorPrirodopisu: facilityType = {
  name: "Laboratoř Přírodopisu",
  nameEn: "Biology Lab",

  colorBgVarName: "prirodopis",
  id: 8,
};

export const sferickeHriste: facilityType = {
  name: "Sférické Hřiště",
  nameEn: "Spherical Playground",

  colorBgVarName: "hriste",
  id: 9,
};

export const scienceOnSphere: facilityType = {
  name: "Sál Science on a Sphere",
  nameEn: "Science on a Sphere Room",

  colorBgVarName: "sos",
  id: 10,
};

export const primestskyTabor: facilityType = {
  name: "Příměstský Tábor",
  nameEn: "Day Camp",

  colorBgVarName: "tabory",
  id: 11,
};

export const kreativniUceni: facilityType = {
  name: "Kreativní Učení",
  nameEn: "Creative Learning",

  colorBgVarName: "white",
  id: 12,
};

export const eduLab: facilityType = {
  name: "AI EduLab @ SFÉRA",
  nameEn: "AI EduLab @ SFERA",

  colorBgVarName: "white",
  id: 13,
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
  sferickeHriste,
  scienceOnSphere,
  primestskyTabor,
];
