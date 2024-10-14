import React from "react";
import { View, Text, Button, Alert, ScrollView } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useRoute } from "@react-navigation/native";
import { PDFDocument } from "pdf-lib";
import { StepFourNavigationProp, StepFourRouteProp } from "./types";
import { processPdfPages } from "./processPages";
import { useNavigation } from "expo-router";

// Дефинираме типа на пропсовете
interface StepFourProps {
  completedSteps: boolean[];
  setCompletedSteps: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const StepFour = ({ completedSteps, setCompletedSteps }: StepFourProps) => {
  const route = useRoute<StepFourRouteProp>();
  const navigation = useNavigation<StepFourNavigationProp>();
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

  const handleNext = () => {
    navigation.navigate("StepFive", {
      pdfUri: route.params.pdfUri, // Предаваме PDF URI към StepFive
      // Можеш да предадеш и други параметри, ако е необходимо
    });
  };

  const [dateDay, dateMonth, dateYear] = date.split(".");
  const [birthDay, birthMonth, birthYear] = birthDate.split(".");
  const [addressStreet, addressPostalCode, addressCity] = address.split(",");

  const dateDayMonthFirst = `${dateDay}.${dateMonth}.`;
  const dateDayMonthSecond = `${dateDay}.${dateMonth}.`;

  const ortWithDate = `${addressCity}, ${date}`;

  const fullAddres = `${addressStreet}, ${addressPostalCode} ${addressCity}`;

  const data = {
    name,
    owner,
    gender,
    date,
    dateDay,
    dateMonth,
    dateYear,
    birthDate,
    birthDay,
    birthMonth,
    birthYear,
    address,
    addressStreet,
    addressCity,
    addressPostalCode,
    employeeSignature,
    ownerSignature,
    x1: "X",
    x2: "X",
    x3: "X",
    x4: "X",
    x5: "X",
    trialDate,
    stampText: `IVANOV TRANSPORT\nGymnasialstrasse 2\n55543 Bad Kreuznach\nivanov.transport@gmx.de\n+491726184067`,
    dateDayMonthFirst,
    dateDayMonthSecond,
    ortWithDate,
    fullAddres
  };

  const generateAndDownloadPdf = async () => {
    try {
      if (!pdfUri) {
        Alert.alert("Error", "No PDF file selected");
        return;
      }

      // Зареждане на PDF
      const existingPdfBytes = await FileSystem.readAsStringAsync(pdfUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Обработване на страниците
      await processPdfPages(pdfDoc, data);

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
        Alert.alert("Sharing not available", "The signed PDF has been saved.");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 20,paddingTop:50, backgroundColor: "#f8f8f8" }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
            color: "#333",
          }}
        >
          Überprüfung und Download des PDFs
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 20,
            color: "#555",
            textAlign: "center",
          }}
        >
          Bitte überprüfen Sie Ihre Informationen, bevor Sie das signierte PDF
          herunterladen.
        </Text>

        {/* Anzeigen einer Zusammenfassung der Benutzereingabedaten */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.5,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
            Arbeitgeber:
          </Text>
          <Text style={{ fontSize: 14, color: "#555" }}>{owner}</Text>

          <Text
            style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}
          >
            Name:
          </Text>
          <Text style={{ fontSize: 14, color: "#555" }}>{name}</Text>

          <Text
            style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}
          >
            Geschlecht:
          </Text>
          <Text style={{ fontSize: 14, color: "#555" }}>{gender}</Text>

          <Text
            style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}
          >
            Datum:
          </Text>
          <Text style={{ fontSize: 14, color: "#555" }}>{date}</Text>

          <Text
            style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}
          >
            Geburtsdatum:
          </Text>
          <Text style={{ fontSize: 14, color: "#555" }}>{birthDate}</Text>

          <Text
            style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}
          >
            Adresse:
          </Text>
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
      <View style={{ padding: 16 }}>
        <Button title="Nächste" onPress={handleNext} color="#4CAF50" />
      </View>
    </ScrollView>
  );
};

export default StepFour;
