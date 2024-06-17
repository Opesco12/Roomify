import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";

import ChatScreen from "../Screens/ChatScreen";
import DrawerNavigator from "./DrawerNavigator";
import ForgotPasswordScreen from "../Screens/ForgotPasswordScreen";
import UploadDetailsScreen from "../Screens/UploadDetailsScreen";
import UserPostsScreen from "../Screens/UserPostsScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import LoginScreen from "../Screens/LoginScreen";

import { auth } from "../../firebaseConfig";

SplashScreen.preventAutoHideAsync();
const StackNavigator = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const Stack = createStackNavigator();

  useEffect(() => {
    const prepare = async () => {
      try {
        // Set up the auth state listener
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          await setUser(user);
          if (initializing) setInitializing(false);

          // Delay to allow for any necessary data loading or animations
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Hide the splash screen after the delay
          await SplashScreen.hideAsync();

          // if (user) {
          //   navigation.replace("Home");
          // } else {
          //   navigation.replace("Login");
          // }
        });
        return unsubscribe;
      } catch (e) {
        console.warn(e);
        await SplashScreen.hideAsync();
        navigation.replace("Login");
      }
    };

    prepare();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Index" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Details" component={UploadDetailsScreen} />
      <Stack.Screen name="MyPosts" component={UserPostsScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
