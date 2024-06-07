import { createStackNavigator } from "@react-navigation/stack";

import ChatScreen from "../Screens/ChatScreen";
import DrawerNavigator from "./DrawerNavigator";
import ChangePasswordScreen from "../Screens/ChangePasswordScreen";
import UploadDetailsScreen from "../Screens/UploadDetailsScreen";
import UserPostsScreen from "../Screens/UserPostsScreen";

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Index" component={DrawerNavigator} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="Details" component={UploadDetailsScreen} />
      <Stack.Screen name="MyPosts" component={UserPostsScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
