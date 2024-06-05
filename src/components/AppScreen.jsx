import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { Header } from "react-native-elements";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import colors from "../constants/Colors";

const StatusBarHeight = StatusBar.currentHeight;

const AppScreen = ({ children, customStyles, screen }) => {
  const navigation = useNavigation();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const iconSelector = (screen) => {
    if (
      screen === "Home" ||
      screen === "Search" ||
      screen === "Upload" ||
      screen === "Messages"
    )
      return "menu";
    return "arrow-back";
  };

  return (
    <View style={[styles.container, customStyles]}>
      <Header
        backgroundColor={colors.primary}
        leftComponent={{
          icon: iconSelector(screen),
          color: colors.white,
          onPress: toggleDrawer,
        }}
        centerComponent={{
          text: screen,
          style: { color: colors.white, fontSize: 18 },
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 10 }}
      >
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    // paddingTop: StatusBarHeight,
    // paddingHorizontal: 10,
    // paddingBottom: 10,
  },
});

export default AppScreen;
