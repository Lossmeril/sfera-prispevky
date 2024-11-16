export type facilityType = {
  name: string;
  nameEn: string;

  colorBgVarName: string;
};

export const dilnaTextilu: facilityType = {
  name: "Dílna Textilu",
  nameEn: "Textiles Workshop",

  colorBgVarName: "textil",
};

export const dilnaGrafiky: facilityType = {
  name: "Dílna Grafiky",
  nameEn: "Graphics Workshop",

  colorBgVarName: "grafika",
};

export const dilnaDreva: facilityType = {
  name: "Dílna Dřeva",
  nameEn: "Wood Workshop",

  colorBgVarName: "drevo",
};

export const dilnaKovu: facilityType = {
  name: "Dílna Kovu/Elektra",
  nameEn: "Metal/Electric Workshop",

  colorBgVarName: "kov",
};

export const laboratorITVR: facilityType = {
  name: "Laboratoř IT/VR",
  nameEn: "Computer Science/VR Lab",

  colorBgVarName: "it",
};

export const laboratorFyziky: facilityType = {
  name: "Laboratoř Fyziky",
  nameEn: "Physics Lab",

  colorBgVarName: "fyzika",
};

export const laboratorChemie: facilityType = {
  name: "Laboratoř Chemie",
  nameEn: "Chemistry Lab",

  colorBgVarName: "chemie",
};

export const laboratorPrirodopisu: facilityType = {
  name: "Laboratoř Přírodopisu",
  nameEn: "Biology Lab",

  colorBgVarName: "prirodopis",
};

export const sferickeHriste: facilityType = {
  name: "Sférické Hřiště",
  nameEn: "Spherical Playground",

  colorBgVarName: "hriste",
};

export const scienceOnSphere: facilityType = {
  name: "Sál Science on a Sphere",
  nameEn: "Science on a Sphere Room",

  colorBgVarName: "sos",
};

export const primestskyTabor: facilityType = {
  name: "Příměstský Tábor",
  nameEn: "Day Camp",

  colorBgVarName: "tabory",
};

export const kreativniUceni: facilityType = {
  name: "Kreativní Učení",
  nameEn: "Creative Learning",

  colorBgVarName: "kreativniuceni",
};

export const eduLab: facilityType = {
  name: "AI EduLab @ SFÉRA",
  nameEn: "AI EduLab @ SFERA",

  colorBgVarName: "white",
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
