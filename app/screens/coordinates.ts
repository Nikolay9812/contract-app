// coordinates.ts
export type CoordinatesMap = {
  [key: number]: FieldCoordinates;
};

export interface FieldCoordinates {
  owner?: { x: number; y: number };
  name?: { x: number; y: number };
  date?: { x: number; y: number };
  dateDay?: { x: number; y: number };
  dateMonth?: { x: number; y: number };
  dateYear?: { x: number; y: number };
  birthDate?: { x: number; y: number };
  gender?: { x: number; y: number };
  employeeSignature?: { x: number; y: number };
  ownerSignature?: { x: number; y: number };
  address?: { x: number; y: number };
  addressStreet?: { x: number; y: number };
  addressPostalCode?: { x: number; y: number };
  addressCity?: { x: number; y: number };
  x1?: { x: number; y: number };
  x2?: { x: number; y: number };
  x3?: { x: number; y: number };
  x4?: { x: number; y: number };
  x5?: { x: number; y: number };
  stampText?: { x: number; y: number };
  trialDate?: { x: number; y: number };
  birthDay?: { x: number; y: number };
  birthMonth?: { x: number; y: number };
  birthYear?: { x: number; y: number };
  dateDayMonthFirst?: { x: number; y: number };
  dateDayMonthSecond?: { x: number; y: number };
}

export const fieldCoordinates: CoordinatesMap = {
  7: {
    name: { x: 150, y: 445 },
    date: { x: 150, y: 370 },
    employeeSignature: { x: 150, y: 360 },
  },
  8: {
    date: { x: 145, y: 130 },
    addressCity: { x: 220, y: 130 },
    employeeSignature: { x: 150, y: 70 },
    name: { x: 145, y: 85 },
    x1: { x: 42, y: 247 }, 
    x2: { x: 42, y: 231 }, 
    x3: { x: 42, y: 218 }, 
    x4: { x: 42, y: 188 }, 
    x5: { x: 42, y: 160 }, 
  },
  9: {
    date: { x: 190, y: 275 },
    addressCity: { x: 110, y: 275 },
    employeeSignature: { x: 110, y: 260 },
    name: { x: 110, y: 320 },
  },
  10: {
    date: { x: 190, y: 427 },
    addressCity: { x: 110, y: 427 },
    employeeSignature: { x: 110, y: 410 },
    name: { x: 110, y: 470 },
  },
  11: {
    date: { x: 70, y: 80 },
    employeeSignature: { x: 150, y: 60 },
    name: { x: 320, y: 80 },
  },
  12: {
    date: { x: 70, y: 110 },
    employeeSignature: { x: 150, y: 70 },
    name: { x: 323, y: 110 },
  },
  13: {
    gender: { x: 72, y: 682 },
    name: { x: 72, y: 668 },
    addressStreet: { x: 72, y: 654 },
    addressPostalCode: { x: 72, y: 640 },
    addressCity: { x: 110, y: 640 },
    birthDate: { x: 445, y: 668 },
    dateDayMonthFirst: { x: 242, y: 310 },
    dateDayMonthSecond: { x: 377, y: 310 },
  },
  18: {
    date: { x: 160, y: 380 },
    ownerSignature: { x: 130, y: 290 },
    stampText: { x: 75, y: 350 },
    employeeSignature: { x: 350, y: 290 },
  },
  20: {
      date: { x: 135, y: 135 },
      owner: { x: 75, y: 77 },
      name: { x: 290, y: 77 },
      employeeSignature: { x: 370, y: 55 },
    },
  21: {
    name: { x: 70, y: 630 },
    birthDate: { x: 70, y: 595 },
    address: { x: 300, y: 595 },
  },
  23: {
    date: { x: 123, y: 610 },
    employeeSignature: { x: 150, y: 550 },
  },
  24: {
    dateDay: { x: 380, y: 645 },
    dateMonth: { x: 405, y: 645 },
    dateYear: { x: 430, y: 645 },
    name: { x: 170, y: 443 },
    birthDay: { x: 330, y: 442 },
    birthMonth: { x: 355, y: 442 },
    birthYear: { x: 380, y: 442 },
    address: { x: 70, y: 406 },
    employeeSignature: { x: 180, y: 70 },
  },
  25: {
    name: { x: 70, y: 716 },
    birthDate: { x: 70, y: 670 },
    date: { x: 70, y: 320 },
    employeeSignature: { x: 180, y: 280 },
    x1: { x: 293, y: 555 },
    trialDate: { x: 395, y: 365 },
  },
  26: {
    date: { x: 68, y: 60 },
    name: { x: 230, y: 60 },
    employeeSignature: { x: 450, y: 50 },
  },
  29: {
    date: { x: 110, y: 85 },
    name: { x: 280, y: 85 },
    employeeSignature: { x: 380, y: 60 },
  },
  30: {
    dateDay: { x: 435, y: 655 },
    dateMonth: { x: 457, y: 655 },
    dateYear: { x: 480, y: 655 },
    name: { x: 280, y: 430 },
    owner: { x: 90, y: 247 },
    ownerSignature: { x: 90, y: 140 },
    employeeSignature: { x: 380, y: 140 },
  },
};
