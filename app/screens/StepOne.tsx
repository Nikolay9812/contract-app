import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';

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
type StepOneNavigationProp = StackNavigationProp<RootStackParamList, 'StepOne'>;

const StepOne = () => {
  const navigation = useNavigation<StepOneNavigationProp>();

  // Структурирано състояние за всички полета
  const [formData, setFormData] = useState({
    owner: 'Zhivko Ivanov',
    gender: '',
    name: '',
    birthDate: '',
    date: '',
    trialDate: '',
    address: '',
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
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setFormData((prevData) => ({
          ...prevData,
          pdfUri: file.uri,
        }));
        Alert.alert('Document Selected', `PDF file: ${file.name}`);
      } else {
        Alert.alert('Document not selected');
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  // Функция за проверка и навигация към StepTwo
  const handleNext = () => {
    const { gender, name, date, trialDate, address, birthDate, pdfUri } = formData;

    if (name && date && address && gender && birthDate) {
      navigation.navigate('StepTwo', {
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
      Alert.alert('Error', 'Please fill out all required fields.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Arbeitgeber: {formData.owner}</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Herr/Frau"
        value={formData.gender}
        onChangeText={(value) => handleInputChange('gender', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Geb."
        value={formData.birthDate}
        onChangeText={(value) => handleInputChange('birthDate', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Datum"
        value={formData.date}
        onChangeText={(value) => handleInputChange('date', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Datum des Termins (Führungszeugnisses)"
        value={formData.trialDate}
        onChangeText={(value) => handleInputChange('trialDate', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={formData.address}
        onChangeText={(value) => handleInputChange('address', value)}
      />

      <Button title="PDF-Dokument auswählen" onPress={pickDocument} />
      {formData.pdfUri && (
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.pdfText}>
          PDF ausgewählt: {formData.pdfUri}
        </Text>
      )}

      <Button title="Nächste" onPress={handleNext} color="#4CAF50" />
    </ScrollView>
  );
};
const styles = StyleSheet .create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  pdfText: {
    marginVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  nextButton: {
    marginTop: 20,
  },
});

export default StepOne;