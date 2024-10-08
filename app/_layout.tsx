import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StepOne from "./screens/StepOne";
import StepTwo from "./screens/StepTwo";
import StepThree from "./screens/StepThree";
import StepFour from "./screens/StepFour";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="StepOne"
          component={StepOne}
          options={{ title: "Schritt 1: Daten eingeben" }}
        />
        <Stack.Screen
          name="StepTwo"
          component={StepTwo}
          options={{ title: "Schritt 2: Unterschrift des Mitarbeiters" }}
        />
        <Stack.Screen
          name="StepThree"
          component={StepThree}
          options={{ title: "Schritt 3: Unterschrift des Eigentümers" }}
        />
        <Stack.Screen
          name="StepFour"
          component={StepFour}
          options={{ title: "Schritt 4: Vorschau & PDF" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
