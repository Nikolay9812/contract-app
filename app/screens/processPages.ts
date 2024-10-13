// processPages.ts
import { PDFDocument, rgb } from 'pdf-lib';
import { fieldCoordinates, CoordinatesMap } from './coordinates';

export const processPdfPages = async (
  pdfDoc: PDFDocument,
  data: { 
    name: string;
    owner: string;
    gender: string;
    date: string;
    dateDay: string;
    dateMonth: string;
    dateYear: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    birthDate: string;
    addressStreet: string;
    addressCity: string;
    addressPostalCode: string;
    employeeSignature: string | null;
    ownerSignature: string | null;
    x1: string;
    x2: string;
    x3: string;
    x4: string;
    x5: string;
    trialDate: string;
    stampText: string;
    dateDayMonthFirst: string;
    dateDayMonthSecond: string;
  }
) => {
  const pages = pdfDoc.getPages();
  
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const coords = fieldCoordinates[i + 1];

    if (!coords) continue;

    if (coords.name) {
      page.drawText(data.name || '', {
        x: coords.name.x,
        y: coords.name.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.owner) {
      page.drawText(data.owner || '', {
        x: coords.owner.x,
        y: coords.owner.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.gender) {
      page.drawText(data.gender || '', {
        x: coords.gender.x,
        y: coords.gender.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.date) {
      page.drawText(data.date || '', {
        x: coords.date.x,
        y: coords.date.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.trialDate) {
      page.drawText(data.trialDate || '', {
        x: coords.trialDate.x,
        y: coords.trialDate.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.stampText) {
      page.drawText(data.stampText, {
        x: coords.stampText.x,
        y: coords.stampText.y,
        size: 8,
        lineHeight: 10,
        color: rgb(0, 0, 1),
      });
    }

    if (coords.x1) {
      page.drawText(data.x1 || '', {
        x: coords.x1.x,
        y: coords.x1.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.x2) {
      page.drawText(data.x2 || '', {
        x: coords.x2.x,
        y: coords.x2.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.x3) {
      page.drawText(data.x3 || '', {
        x: coords.x3.x,
        y: coords.x3.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.x4) {
      page.drawText(data.x4 || '', {
        x: coords.x4.x,
        y: coords.x4.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.x5) {
      page.drawText(data.x5 || '', {
        x: coords.x5.x,
        y: coords.x5.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.addressStreet) {
      page.drawText(data.addressStreet || "", {
        x: coords.addressStreet.x,
        y: coords.addressStreet.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    // Добавяне на пощенския код
    if (coords.addressPostalCode) {
      page.drawText(data.addressPostalCode || "", {
        x: coords.addressPostalCode.x,
        y: coords.addressPostalCode.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    // Добавяне на града
    if (coords.addressCity) {
      page.drawText(data.addressCity || "", {
        x: coords.addressCity.x,
        y: coords.addressCity.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.birthDay) {
      page.drawText(data.birthDay, {
        x: coords.birthDay.x,
        y: coords.birthDay.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.birthMonth) {
      page.drawText(data.birthMonth, {
        x: coords.birthMonth.x,
        y: coords.birthMonth.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.birthYear) {
      page.drawText(data.birthYear, {
        x: coords.birthYear.x,
        y: coords.birthYear.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.birthDate) {
      page.drawText(data.birthDate, {
        x: coords.birthDate.x,
        y: coords.birthDate.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.dateDay) {
      page.drawText(data.dateDay, {
        x: coords.dateDay.x,
        y: coords.dateDay.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.dateMonth) {
      page.drawText(data.dateMonth, {
        x: coords.dateMonth.x,
        y: coords.dateMonth.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.dateYear) {
      page.drawText(data.dateYear, {
        x: coords.dateYear.x,
        y: coords.dateYear.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.dateDayMonthFirst) {
      page.drawText(data.dateDayMonthFirst, {
        x: coords.dateDayMonthFirst.x,
        y: coords.dateDayMonthFirst.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    if (coords.dateDayMonthSecond) {
      page.drawText(data.dateDayMonthSecond, {
        x: coords.dateDayMonthSecond.x,
        y: coords.dateDayMonthSecond.y,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }

    // Подпис на служителя
    if (coords.employeeSignature && data.employeeSignature) {
      const signatureImage = await pdfDoc.embedPng(data.employeeSignature);
      const imageDims = signatureImage.scale(0.1);

      page.drawImage(signatureImage, {
        x: coords.employeeSignature.x,
        y: coords.employeeSignature.y,
        width: imageDims.width,
        height: imageDims.height,
      });
    }

    // Подпис на собственика
    if (coords.ownerSignature && data.ownerSignature) {
      const signatureImage = await pdfDoc.embedPng(data.ownerSignature);
      const imageDims = signatureImage.scale(0.1);

      page.drawImage(signatureImage, {
        x: coords.ownerSignature.x,
        y: coords.ownerSignature.y,
        width: imageDims.width,
        height: imageDims.height,
      });
    }
  }
};
