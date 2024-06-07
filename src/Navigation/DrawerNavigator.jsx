import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./TabNavigator";
import AppDrawerContent from "../components/AppDrawerContent";

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <AppDrawerContent {...props} />}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
