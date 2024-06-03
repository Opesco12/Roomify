import React from "react";
import { StyleSheet, Text, StatusBar } from "react-native";

import LoginScreen from "./Screens/LoginScreen";
import SignUp from "./Screens/SignUpScreen";
import UploadDetailsScreen from "./Screens/UploadDetailsScreen";
import UploadScreen from "./Screens/UploadScreen";
import colors from "./constants/Colors";
import HomeScreen from "./Screens/HomeScreen";
import SearchScreen from "./Screens/SearchScreen";

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      {/* <LoginScreen /> */}
      {/* <SignUp /> */}
      {/* <UploadDetailsScreen /> */}
      {/* <UploadScreen /> */}
      {/* <HomeScreen /> */}
      <SearchScreen />
    </>
  );
};

export default App;
