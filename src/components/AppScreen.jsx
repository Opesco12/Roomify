import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { Header } from "react-native-elements";

import colors from "../constants/Colors";
import { color } from "react-native-elements/dist/helpers";

const StatusBarHeight = StatusBar.currentHeight;

const AppScreen = ({ children, customStyles, screen }) => {
  return (
    <View style={[styles.container, customStyles]}>
      <Header
        backgroundColor={colors.primary}
        // leftComponent={{icon: }}
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
    flex: 1,
    paddingTop: StatusBarHeight,
    // paddingHorizontal: 10,
    // paddingBottom: 10,
  },
});

export default AppScreen;
