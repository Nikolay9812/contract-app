import React from 'react';
import { View, Button, Text } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StepTwoNavigationProp, StepTwoRouteProp } from './types';

const StepTwo = () => {
  const navigation = useNavigation<StepTwoNavigationProp>();
  const route = useRoute<StepTwoRouteProp>();
  const [employeeSignature, setEmployeeSignature] = React.useState<string | null>(null);

  const handleOK = (sig: string) => {
    setEmployeeSignature(sig);
  };

  const handleNext = () => {
    navigation.navigate('StepThree', {
      gender: route.params.gender,
      owner: route.params.owner,
      name: route.params.name,
      birthDate: route.params.birthDate,
      trialDate: route.params.trialDate,
      date: route.params.date,
      address: route.params.address,
      employeeSignature: employeeSignature, // Запазва подписа на служителя
      pdfUri: route.params.pdfUri, 
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', padding: 16 }}>Unterschrift des Mitarbeiters</Text>
      <View style={{ flex: 1 }}>
        <Signature
          onOK={handleOK}
          descriptionText="Unterschrift hier"
          clearText="Aufräumen"
          confirmText="Speichern"
          webStyle={''}
          penColor='rgb(0, 0, 255)'
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc' }}
        />
      </View>
      <View style={{ padding: 16 }}>
        <Button title="Nächste" onPress={handleNext} color="#4CAF50" />
      </View>
    </View>
  );
};


export default StepTwo;