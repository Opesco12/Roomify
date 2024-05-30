import React from "react";
import { StyleSheet, Text, StatusBar } from "react-native";

import LoginScreen from "./Screens/LoginScreen";
import SignUp from "./Screens/SignUpScreen";
import colors from "./constants/Colors";

const App = () => {
  return (
    <>
      <StatusBar translucent={false} />
      {/* <LoginScreen /> */}
      <SignUp />
    </>
  );
};

export default App;
