import { Text, View, Pressable, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AppScreen from "../components/AppScreen";
import AgentSignUp from "./AuthSubScreens/AgentSignUp";
import StudentSignUp from "./AuthSubScreens/StudentSignUp";
import colors from "../constants/Colors";

const SignUp = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <NavigationContainer>
      <AppScreen customStyles={{ backgroundColor: colors.white }}>
        <Tab.Navigator>
          <Tab.Screen name="student" component={StudentSignUp} />
          <Tab.Screen name="agent" component={AgentSignUp} />
        </Tab.Navigator>
      </AppScreen>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  bottomText: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default SignUp;
