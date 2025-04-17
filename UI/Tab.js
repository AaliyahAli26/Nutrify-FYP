import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../Screens/HomeScreen";
import RemindersScreen from "../Screens/RemindersScreen";
import HistoryScreen from "../Screens/HistoryScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import VirtualGardenScreen from "../Screens/VirtualGardenScreen";
import HealthTestScreen from "../Screens/HealthScannerScreen";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "teal",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          paddingBottom: 7,
          height: 80,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Dietary Advice"
        component={RemindersScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="alarm" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Mood Tracker"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Garden"
        component={VirtualGardenScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="leaf" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Health Scan"
        component={HealthTestScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
