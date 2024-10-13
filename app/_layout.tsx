import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StepOne from "./screens/StepOne";
import StepTwo from "./screens/StepTwo";
import StepThree from "./screens/StepThree";
import StepFour from "./screens/StepFour";
import StepFive from "./screens/StepFive";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import this


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      
      <NavigationContainer independent>
        <Tab.Navigator>
          <Tab.Screen
            name="StepOne"
            component={StepOne}
            options={{
              title: "Schritt 1",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="StepTwo"
            component={StepTwo}
            options={{
              title: "Schritt 2",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="pencil-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="StepThree"
            component={StepThree}
            options={{
              title: "Schritt 3",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="checkmark-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="StepFour"
            component={StepFour}
            options={{
              title: "Schritt 4",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="eye-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="StepFive"
            component={StepFive}
            options={{
              title: "Schritt 5",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="map-outline" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
