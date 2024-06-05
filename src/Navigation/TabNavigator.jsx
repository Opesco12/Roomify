import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import HomeScreen from "../Screens/HomeScreen";
import SearchScreen from "../Screens/SearchScreen";
import UploadScreen from "../Screens/UploadScreen";
import MessagesScreen from "../Screens/MessagesScreen";
import { colors } from "react-native-elements";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <AntDesign
              name="home"
              size={size}
              color={focused ? colors.primary : colors.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <AntDesign
              name="search1"
              size={size}
              color={focused ? colors.primary : colors.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <AntDesign
              name="upload"
              size={size}
              color={focused ? colors.primary : colors.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <AntDesign
              name="mail"
              size={size}
              color={focused ? colors.primary : colors.black}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
