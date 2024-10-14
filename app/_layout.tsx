import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StepOne from "./screens/StepOne";
import StepTwo from "./screens/StepTwo";
import StepThree from "./screens/StepThree";
import StepFour from "./screens/StepFour";
import StepFive from "./screens/StepFive";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import this
import { TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

export default function App() {
  const [completedSteps, setCompletedSteps] = useState([
    true,
    false,
    false,
    false,
  ]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer independent>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "green", // Цветът на текста и иконата, когато табът е активен
            tabBarInactiveTintColor: "gray", // Цветът на текста и иконата, когато табът е неактивен
          }}
        >
          <Tab.Screen
            name="StepOne"
            children={() => (
              <StepOne
                completedSteps={completedSteps}
                setCompletedSteps={setCompletedSteps}
              />
            )}
            options={{
              title: "Schritt 1",
              headerShown: false,
              tabBarIcon: ({ size, color }) => (
                <AntDesign name="upload" color={color} size={size} />
              ),
              tabBarButton: (props) =>
                completedSteps[0] ? <TouchableOpacity {...props} /> : null,
            }}
          />
          <Tab.Screen
            name="StepTwo"
            children={() => (
              <StepTwo
                completedSteps={completedSteps}
                setCompletedSteps={setCompletedSteps}
              />
            )}
            options={{
              title: "Schritt 2",
              headerShown: false,
              tabBarIcon: ({ size, color }) => (
                <FontAwesome5 name="file-signature" color={color} size={size} />
              ),
              tabBarButton: (props) =>
                completedSteps[1] ? <TouchableOpacity {...props} /> : null,
            }}
          />
          <Tab.Screen
            name="StepThree"
            children={() => (
              <StepThree
                completedSteps={completedSteps}
                setCompletedSteps={setCompletedSteps}
              />
            )}
            options={{
              title: "Schritt 3",
              headerShown: false,
              tabBarIcon: ({ size, color }) => (
                <FontAwesome5 name="file-signature" color={color} size={size} />
              ),
              tabBarButton: (props) =>
                completedSteps[2] ? <TouchableOpacity {...props} /> : null,
            }}
          />
          <Tab.Screen
            name="StepFour"
            children={() => (
              <StepFour
                completedSteps={completedSteps}
                setCompletedSteps={setCompletedSteps}
              />
            )}
            options={{
              title: "Schritt 4",
              headerShown: false,
              tabBarIcon: ({ size, color }) => (
                <AntDesign name="download" color={color} size={size} />
              ),
              tabBarButton: (props) =>
                completedSteps[3] ? <TouchableOpacity {...props} /> : null,
            }}
          />
          <Tab.Screen
            name="StepFive"
            component={StepFive}
            options={{
              title: "PDFs",
              headerShown: false,
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="map-outline" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
