import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { StackNavigationProp } from '@react-navigation/stack';

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
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Owner: {formData.owner}</Text>

      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
        placeholder="Employee Name"
        value={formData.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />

      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
        placeholder="Employee Gender"
        value={formData.gender}
        onChangeText={(value) => handleInputChange('gender', value)}
      />

      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
        placeholder="Employee Birth Date"
        value={formData.birthDate}
        onChangeText={(value) => handleInputChange('birthDate', value)}
      />

      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
        placeholder="Date"
        value={formData.date}
        onChangeText={(value) => handleInputChange('date', value)}
      />

      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
        placeholder="Trial Date"
        value={formData.trialDate}
        onChangeText={(value) => handleInputChange('trialDate', value)}
      />

      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
        placeholder="Address"
        value={formData.address}
        onChangeText={(value) => handleInputChange('address', value)}
      />

      <Button title="Pick PDF Document" onPress={pickDocument} />
      {formData.pdfUri && <Text style={{ marginVertical: 10 }}>PDF selected: {formData.pdfUri}</Text>}

      <Button title="Next" onPress={handleNext} color="#4CAF50" />
    </View>
  );
};

export default StepOne;