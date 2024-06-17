import React, { useEffect } from "react";
import { StyleSheet, Text, StatusBar, Platform } from "react-native";
import FlashMessage from "react-native-flash-message";
import * as SplashScreen from "expo-splash-screen";

import LoginScreen from "./Screens/LoginScreen";
import SignUp from "./Screens/SignUpScreen";
import UploadDetailsScreen from "./Screens/UploadDetailsScreen";
import UploadScreen from "./Screens/UploadScreen";
import colors from "./constants/Colors";
import HomeScreen from "./Screens/HomeScreen";
import SearchScreen from "./Screens/SearchScreen";
import MessagesScreen from "./Screens/MessagesScreen";
import ChatScreen from "./Screens/ChatScreen";

import TabNavigator from "./Navigation/TabNavigator";
import DrawerNavigator from "./Navigation/DrawerNavigator";
import Navigator from "./Navigation/Navigator";

// SplashScreen.preventAutoHideAsync();
const App = () => {
  // useEffect(() => {
  //   const prepare = async () => {
  //     try {
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       await SplashScreen.hideAsync();
  //     }
  //   };
  //   prepare();
  // }, []);
  return (
    <>
      <StatusBar translucent={false} />
      <Navigator />
      <FlashMessage position={"top"} style={{ marginTop: 35 }} />
    </>
  );
};

export default App;
