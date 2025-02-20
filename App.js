import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import WelcomeScreen from "./Screens/WelcomeScreen";
import StartingScreen from "./Screens/StartingScreen";
import AddReminderScreen from "./Screens/AddReminderScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="WelcomeScreen"
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="StartingScreen" component={StartingScreen} />
        <Stack.Screen name="AddReminderScreen" component={AddReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
