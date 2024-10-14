import React from 'react';
import { View, Button, Text } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StepTwoNavigationProp, StepTwoRouteProp } from './types';

interface StepThreeProps {
  completedSteps: boolean[];
  setCompletedSteps: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const StepThree = ({ completedSteps, setCompletedSteps }: StepThreeProps) => {
  const navigation = useNavigation<StepTwoNavigationProp>();
  const route = useRoute<StepTwoRouteProp>();
  const [ownerSignature, setOwnerSignature] = React.useState<string | null>(null);

  const handleOK = (sig: string) => {
    setOwnerSignature(sig);
  };

  const handleNext = () => {
    if (!ownerSignature) {
      alert("Bitte unterschreiben Sie zuerst."); // Покажи предупреждение, ако подписът е празен
      return;
    }
    setCompletedSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      newSteps[3] = true; // Отключи StepFour
      return newSteps;
    });
    navigation.navigate('StepFour', {
      gender: route.params.gender,
      owner: route.params.owner,
      name: route.params.name,
      birthDate: route.params.birthDate,
      date: route.params.date,
      trialDate: route.params.trialDate,
      address: route.params.address,
      employeeSignature: route.params.employeeSignature, // Подписът на служителя
      ownerSignature: ownerSignature, // Подписът на собственика
      pdfUri: route.params.pdfUri, 
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white',paddingTop:50, }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', padding: 16 }}>Unterschrift des Arbeitgeber</Text>
      <View style={{ flex: 1 }}>
        <Signature
          onOK={handleOK}
          descriptionText="Unterschrift des Arbeitgeber"
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



export default StepThree;