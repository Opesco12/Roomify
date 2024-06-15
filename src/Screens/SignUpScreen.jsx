import { Text, View, Pressable, StyleSheet, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createUserWithEmailAndPassword } from "firebase/auth";

import AppScreen from "../components/AppScreen";
import AgentSignUp from "./AuthSubScreens/AgentSignUp";
import StudentSignUp from "./AuthSubScreens/StudentSignUp";
import AppHeader from "../components/AppHeader";
import colors from "../constants/Colors";

import { auth, db } from "../../firebaseConfig";

const SignUp = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      <AppHeader
        backgroundColor={colors.primary}
        centerComponent={{
          text: "Sign Up",
          style: { color: colors.white, fontSize: 18 },
        }}
      />
      <View style={styles.comp}>
        <ScrollView>
          <Tab.Navigator>
            <Tab.Screen name="student" component={StudentSignUp} />
            <Tab.Screen name="agent" component={AgentSignUp} />
          </Tab.Navigator>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomText: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  comp: {
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default SignUp;
