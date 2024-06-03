import { ScrollView, StatusBar, StyleSheet, View } from "react-native";

const StatusBarHeight = StatusBar.currentHeight;

const AppScreen = ({ children, customStyles }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container, customStyles]}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBarHeight,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

export default AppScreen;
