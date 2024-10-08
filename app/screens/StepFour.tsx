import React from "react";
import { View, Text, Button, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import { PDFDocument, rgb } from "pdf-lib";
import * as Sharing from "expo-sharing";
import { useRoute } from "@react-navigation/native";
import { StepFourRouteProp } from "./types";

// Примерен интерфейс за координатите
interface FieldCoordinates {
  owner?: { x: number; y: number };
  name?: { x: number; y: number };
  date?: { x: number; y: number };
  dateDay?: { x: number; y: number };
  dateMonth?: { x: number; y: number };
  dateYear?: { x: number; y: number };
  birthDate?: { x: number; y: number };
  gender?: { x: number; y: number };
  employeeSignature?: { x: number; y: number }; // Подпис на служителя
  ownerSignature?: { x: number; y: number }; // Подпис на собственика
  address?: { x: number; y: number };
  addressStreet?: { x: number; y: number }; // Улица
  addressPostalCode?: { x: number; y: number }; // Пощенски код
  addressCity?: { x: number; y: number }; // Град
  x1?: { x: number; y: number }; // Подпис на собственика
  x2?: { x: number; y: number }; // Подпис на собственика
  x3?: { x: number; y: number }; // Подпис на собственика
  x4?: { x: number; y: number }; // Подпис на собственика
  x5?: { x: number; y: number }; // Подпис на собственика
  stampText?: { x: number; y: number }; // Подпис на собственика
  trialDate?: { x: number; y: number }; // Подпис на собственика
  birthDay?: { x: number; y: number }; // Подпис на собственика
  birthMonth?: { x: number; y: number }; // Подпис на собственика
  birthYear?: { x: number; y: number }; // Подпис на собственика
  dateDayMonthFirst?: { x: number; y: number }; // Подпис на собственика
  dateDayMonthSecond?: { x: number; y: number }; // Подпис на собственика
}

type CoordinatesMap = {
  [key: number]: FieldCoordinates;
};

const StepFour = () => {
  const route = useRoute<StepFourRouteProp>();
  const {
    owner,
    name,
    gender,
    date,
    trialDate,
    birthDate,
    address,
    employeeSignature,
    ownerSignature,
    pdfUri,
  } = route.params;

  const [dateDay, dateMonth, dateYear] = date.split(".");
  const [birthDay, birthMonth, birthYear] = birthDate.split(".");
  const [addressStreet, addressPostalCode, addressCity] = address.split(",");

  const dateDayMonthFirst = `${dateDay}.${dateMonth}.`;
  const dateDayMonthSecond = `${dateDay}.${dateMonth}.`;

  const x1 = "X";
  const x2 = "X";
  const x3 = "X";
  const x4 = "X";
  const x5 = "X";

  const stampText = `IVANOV TRANSPORT\nGymnasialstrasse 2\n55543 Bad Kreuznach\nivanov.transport@gmx.de\n+491726184067`;

  const generateAndDownloadPdf = async () => {
    try {
      if (!pdfUri) {
        Alert.alert("Error", "No PDF file selected");
        return;
      }

      // Зареждане на съществуващия PDF
      const existingPdfBytes = await FileSystem.readAsStringAsync(pdfUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Определяне на координатите за полетата на страниците
      const fieldCoordinates: CoordinatesMap = {
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
          addressCity: { x: 72, y: 640 },
          addressPostalCode: { x: 132, y: 640 },
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

      const pages = pdfDoc.getPages();

      // Обработване на всяка страница по отделно
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const coords = fieldCoordinates[i + 1];

        if (coords) {
          if (coords.trialDate) {
            page.drawText(trialDate, {
              x: coords.trialDate.x,
              y: coords.trialDate.y,
              size: 12, 
              color: rgb(0, 0, 0),
            });
          }

          if (coords.dateDayMonthFirst) {
            page.drawText(dateDayMonthFirst, {
              x: coords.dateDayMonthFirst.x,
              y: coords.dateDayMonthFirst.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          if (coords.dateDayMonthSecond) {
            page.drawText(dateDayMonthSecond, {
              x: coords.dateDayMonthSecond.x,
              y: coords.dateDayMonthSecond.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          if (coords.dateDay) {
            page.drawText(dateDay, {
              x: coords.dateDay.x,
              y: coords.dateDay.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          if (coords.dateMonth) {
            page.drawText(dateMonth, {
              x: coords.dateMonth.x,
              y: coords.dateMonth.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          if (coords.dateYear) {
            page.drawText(dateYear, {
              x: coords.dateYear.x,
              y: coords.dateYear.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          if (coords.birthDay) {
            page.drawText(birthDay, {
              x: coords.birthDay.x,
              y: coords.birthDay.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          if (coords.birthMonth) {
            page.drawText(birthMonth, {
              x: coords.birthMonth.x,
              y: coords.birthMonth.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          if (coords.birthYear) {
            page.drawText(birthYear, {
              x: coords.birthYear.x,
              y: coords.birthYear.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          if (coords.stampText) {
            page.drawText(stampText, {
              x: coords.stampText.x,
              y: coords.stampText.y,
              size: 8,
              lineHeight: 10,
              color: rgb(0, 0, 1),
            });
          }

          if (coords.x1) {
            page.drawText(x1, {
              x: coords.x1.x,
              y: coords.x1.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }
  
          if (coords.x2) {
            page.drawText(x2, {
              x: coords.x2.x,
              y: coords.x2.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }
  
          if (coords.x3) {
            page.drawText(x3, {
              x: coords.x3.x,
              y: coords.x3.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }
  
          if (coords.x4) {
            page.drawText(x4, {
              x: coords.x4.x,
              y: coords.x4.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }
  
          if (coords.x5) {
            page.drawText(x5, {
              x: coords.x5.x,
              y: coords.x5.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          if (coords.addressStreet) {
            page.drawText(addressStreet || "", {
              x: coords.addressStreet.x,
              y: coords.addressStreet.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          // Добавяне на пощенския код
          if (coords.addressPostalCode) {
            page.drawText(addressPostalCode || "", {
              x: coords.addressPostalCode.x,
              y: coords.addressPostalCode.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          // Добавяне на града
          if (coords.addressCity) {
            page.drawText(addressCity || "", {
              x: coords.addressCity.x,
              y: coords.addressCity.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          // Проверка и добавяне на име
          if (coords.name) {
            page.drawText(name || "", {
              x: coords.name.x,
              y: coords.name.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          // Проверка и добавяне на име
          if (coords.gender) {
            page.drawText(gender || "", {
              x: coords.gender.x,
              y: coords.gender.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          // Проверка и добавяне на име
          if (coords.owner) {
            page.drawText(owner || "", {
              x: coords.owner.x,
              y: coords.owner.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          // Проверка и добавяне на дата
          if (coords.date) {
            page.drawText(date || "", {
              x: coords.date.x,
              y: coords.date.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          // Проверка и добавяне на дата
          if (coords.birthDate) {
            page.drawText(birthDate || "", {
              x: coords.birthDate.x,
              y: coords.birthDate.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          // Проверка и добавяне на адрес
          if (coords.address) {
            page.drawText(address || "", {
              x: coords.address.x,
              y: coords.address.y,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }

          // Добавяне на подписа на служителя
          if (coords.employeeSignature && employeeSignature) {
            const signatureImage = await pdfDoc.embedPng(employeeSignature);
            const imageDims = signatureImage.scale(0.1);

            page.drawImage(signatureImage, {
              x: coords.employeeSignature.x,
              y: coords.employeeSignature.y,
              width: imageDims.width,
              height: imageDims.height,
            });
          }

          // Добавяне на подписа на собственика
          if (coords.ownerSignature && ownerSignature) {
            const signatureImage = await pdfDoc.embedPng(ownerSignature);
            const imageDims = signatureImage.scale(0.1);

            page.drawImage(signatureImage, {
              x: coords.ownerSignature.x,
              y: coords.ownerSignature.y,
              width: imageDims.width,
              height: imageDims.height,
            });
          }
        }
      }

      // Записване на модифицирания PDF
      const pdfBytes = await pdfDoc.saveAsBase64();
      const fileUri = `${FileSystem.documentDirectory}contract_signed.pdf`;

      await FileSystem.writeAsStringAsync(fileUri, pdfBytes, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Споделяне на подписания PDF файл
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Sharing not available", "Unable to share PDF file.");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      Alert.alert("Error", "Failed to generate and download PDF.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f8f8f8" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#333" }}>
        Überprüfung und Download des PDFs
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 20, color: "#555", textAlign: "center" }}>
        Bitte überprüfen Sie Ihre Informationen, bevor Sie das signierte PDF herunterladen.
      </Text>
      
      {/* Anzeigen einer Zusammenfassung der Benutzereingabedaten */}
      <View style={{ backgroundColor: "#fff", borderRadius: 8, padding: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.5, elevation: 3 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>Arbeitgeber:</Text>
        <Text style={{ fontSize: 14, color: "#555" }}>{owner}</Text>
  
        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>Name:</Text>
        <Text style={{ fontSize: 14, color: "#555" }}>{name}</Text>
  
        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>Geschlecht:</Text>
        <Text style={{ fontSize: 14, color: "#555" }}>{gender}</Text>
  
        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>Datum:</Text>
        <Text style={{ fontSize: 14, color: "#555" }}>{date}</Text>
  
        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>Geburtsdatum:</Text>
        <Text style={{ fontSize: 14, color: "#555" }}>{birthDate}</Text>
  
        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>Adresse:</Text>
        <Text style={{ fontSize: 14, color: "#555" }}>{address}</Text>
      </View>
  
      {/* Download-Button */}
      <View style={{ marginTop: 30 }}>
        <Button
          title="Download signiertes PDF"
          onPress={generateAndDownloadPdf}
          color="#4CAF50"
          accessibilityLabel="Laden Sie das signierte PDF-Dokument herunter"
        />
      </View>
    </View>
  );
  
};

export default StepFour;