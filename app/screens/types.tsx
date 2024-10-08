import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Дефиниция на типовете за екраните
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
    employeeSignature: string | null; 
    pdfUri: string | null 
  }; 
  StepThree: { 
    gender: string; 
    owner: string; 
    name: string; 
    birthDate: string;  
    trialDate: string; 
    date: string; 
    address: string; 
    employeeSignature: string | null; 
    pdfUri: string | null 
  };
  StepFour: { 
    gender: string; 
    owner: string; 
    name: string; 
    birthDate: string; 
    trialDate: string;  
    date: string; 
    address: string; 
    employeeSignature: string | null; 
    ownerSignature: string | null; 
    pdfUri: string | null 
  };
};

// Типизация за навигацията (за всяка стъпка)
export type StepTwoNavigationProp = StackNavigationProp<RootStackParamList, 'StepTwo'>;
export type StepThreeNavigationProp = StackNavigationProp<RootStackParamList, 'StepThree'>;
export type StepFourNavigationProp = StackNavigationProp<RootStackParamList, 'StepFour'>;

// Типизация за рутовете (за всяка стъпка)
export type StepTwoRouteProp = RouteProp<RootStackParamList, 'StepTwo'>;
export type StepThreeRouteProp = RouteProp<RootStackParamList, 'StepThree'>;
export type StepFourRouteProp = RouteProp<RootStackParamList, 'StepFour'>;