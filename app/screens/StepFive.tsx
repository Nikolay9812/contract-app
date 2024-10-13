import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { PDFDocument } from "pdf-lib";
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons } from "@expo/vector-icons"; // Добавяме икона

const StepFive = () => {
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null); // За да съхраняваме името на файла
  const [selectedRange, setSelectedRange] = useState<[number, number] | null>(
    null
  );

  // Функция за избор на PDF документ
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setPdfUri(file.uri); // Задаване на избрания PDF
        setPdfName(file.name); // Запазване на името на файла
        Alert.alert("Dokument ausgewählt", `PDF Datei: ${file.name}`);
      } else {
        Alert.alert("Kein Dokument ausgewählt");
      }
    } catch (error) {
      console.error("Fehler beim Auswählen des Dokuments:", error);
      Alert.alert("Fehler", "Dokument konnte nicht ausgewählt werden");
    }
  };

  // Функция за генериране и изтегляне на PDF
  const generateAndDownloadPdf = async () => {
    try {
      if (!pdfUri) {
        Alert.alert("Fehler", "Keine PDF-Datei ausgewählt");
        return;
      }

      if (!selectedRange) {
        Alert.alert("Fehler", "Kein Seitenbereich ausgewählt");
        return;
      }

      const existingPdfBytes = await FileSystem.readAsStringAsync(pdfUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const [startPage, endPage] = selectedRange;
      const pdfDocSubset = await PDFDocument.create();

      for (let i = startPage - 1; i < endPage; i++) {
        const [page] = await pdfDocSubset.copyPages(pdfDoc, [i]);
        pdfDocSubset.addPage(page);
      }

      const pdfBytes = await pdfDocSubset.saveAsBase64();
      const fileUri = `${FileSystem.documentDirectory}selected_pages.pdf`;
      await FileSystem.writeAsStringAsync(fileUri, pdfBytes, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert(
          "Freigabe nicht verfügbar",
          "Die PDF mit den ausgewählten Seiten wurde gespeichert."
        );
      }
    } catch (error) {
      console.error("Fehler beim Erstellen der PDF:", error);
    }
  };

  // Рендиране на бутоните за диапазон от страници
  const renderPageButtons = () => {
    const ranges = [
      [1, 7],
      [8],
      [9],
      [10],
      [11],
      [12],
      [13, 18],
      [19, 20],
      [21, 23],
      [24],
      [25],
      [26, 28],
      [29],
      [30],
    ];

    return ranges.map(([start, end]) => (
      <Button
        key={`${start}-${end || start}`}
        title={`Seiten ${start}-${end || start}`} // Ако 'end' липсва, използва 'start'
        onPress={() => setSelectedRange([start, end || start])} // Ако 'end' липсва, използва 'start' за 'end'
        color={
          selectedRange &&
          selectedRange[0] === start &&
          selectedRange[1] === (end || start)
            ? "green"
            : "blue"
        }
      />
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>PDF-Seiten auswählen und extrahieren</Text>
      <Button
        title="PDF-Dokument auswählen"
        onPress={pickDocument}
        color="green"
      />

      {pdfUri && (
        <>
          <View style={styles.pdfContainer}>
            <MaterialIcons name="picture-as-pdf" size={34} color="red" />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.pdfText}>
              {pdfName}
            </Text>
          </View>
          <Text style={styles.header}>Seitenbereich auswählen:</Text>
          <View style={{ marginVertical: 30 }}>{renderPageButtons()}</View>
          <Button
            title="PDF erstellen und herunterladen"
            onPress={generateAndDownloadPdf}
            color="green"
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  pdfContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  pdfText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default StepFive;
