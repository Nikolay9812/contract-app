import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StepOne from './screens/StepOne';
import StepTwo from './screens/StepTwo';
import StepThree from './screens/StepThree';
import StepFour from './screens/StepFour';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen name="StepOne" component={StepOne} options={{ title: 'Step 1: Enter Details' }} />
        <Stack.Screen name="StepTwo" component={StepTwo} options={{ title: 'Step 2: Signature Employee' }} />
        <Stack.Screen name="StepThree" component={StepThree} options={{ title: 'Step 3: Signature Owner' }} />
        <Stack.Screen name="StepFour" component={StepFour} options={{ title: 'Step 4: Preview & PDF' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}