import { createStackNavigator } from "@react-navigation/stack";

import ChatScreen from "../Screens/ChatScreen";
import DrawerNavigator from "./DrawerNavigator";
import ForgotPasswordScreen from "../Screens/ForgotPasswordScreen";
import UploadDetailsScreen from "../Screens/UploadDetailsScreen";
import UserPostsScreen from "../Screens/UserPostsScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import LoginScreen from "../Screens/LoginScreen";

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Index" component={DrawerNavigator} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Details" component={UploadDetailsScreen} />
      <Stack.Screen name="MyPosts" component={UserPostsScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
