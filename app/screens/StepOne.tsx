import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons"; // Добавяме икона

// Типове за навигацията
type RootStackParamList = {
  StepOne: undefined;
  StepTwo: {
    gender: string;
    owner: string;
    name: string;
    birthDate: string;
    trialDate: string;
    date: string;
    address: string;
    pdfUri: string | null;
  };
};

// Навигационен проп за StepOne
type StepOneNavigationProp = StackNavigationProp<RootStackParamList, "StepOne">;

// Дефинираме типа на пропсовете
interface StepOneProps {
  completedSteps: boolean[]; // completedSteps е масив от булеви стойности
  setCompletedSteps: React.Dispatch<React.SetStateAction<boolean[]>>; // setCompletedSteps е функция за промяна на completedSteps
}

const StepOne = ({ completedSteps, setCompletedSteps }: StepOneProps) => {
  const navigation = useNavigation<StepOneNavigationProp>();
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);

  // Структурирано състояние за всички полета
  const [formData, setFormData] = useState({
    owner: "Zhivko Ivanov",
    gender: "",
    name: "",
    birthDate: "",
    date: "",
    trialDate: "",
    address: "",
    pdfUri: null as string | null,
  });

  // Обработка на въвеждането на текст
  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Функция за избор на PDF документ
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setFormData((prevData) => ({
          ...prevData,
          pdfUri: file.uri,
        }));
        setPdfUri(file.uri); // Задаване на избрания PDF
        setPdfName(file.name); // Запазване на името на файла
        Alert.alert("Document Selected", `PDF file: ${file.name}`);
      } else {
        Alert.alert("Document not selected");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to pick document");
    }
  };

  // Функция за проверка и навигация към StepTwo
  const handleNext = () => {
    const { gender, name, date, trialDate, address, birthDate, pdfUri } =
      formData;

    if (name && date && address && gender && birthDate) {
      // Отключи следващата стъпка
      setCompletedSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        newSteps[1] = true; // Активирай StepTwo след попълване на StepOne
        return newSteps;
      });

      navigation.navigate("StepTwo", {
        gender,
        owner: formData.owner,
        name,
        birthDate,
        date,
        trialDate,
        address,
        pdfUri,
      });
    } else {
      Alert.alert("Error", "Please fill out all required fields.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Arbeitgeber: {formData.owner}</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(value) => handleInputChange("name", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Herr/Frau"
        value={formData.gender}
        onChangeText={(value) => handleInputChange("gender", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Geb."
        value={formData.birthDate}
        onChangeText={(value) => handleInputChange("birthDate", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Datum"
        value={formData.date}
        onChangeText={(value) => handleInputChange("date", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Datum des Termins (Führungszeugnisses)"
        value={formData.trialDate}
        onChangeText={(value) => handleInputChange("trialDate", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={formData.address}
        onChangeText={(value) => handleInputChange("address", value)}
      />

      <Button title="PDF-Dokument auswählen" onPress={pickDocument} />
      {formData.pdfUri && (
        <View style={styles.pdfContainer}>
          <MaterialIcons name="picture-as-pdf" size={34} color="red" />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.pdfText}>
            {pdfName}
          </Text>
        </View>
      )}

      <Button title="Nächste" onPress={handleNext} color="#4CAF50" />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
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
  nextButton: {
    marginTop: 20,
  },
});

export default StepOne;
