import { StyleSheet, Text, View } from "react-native";

const AppItemSeparator = () => {
  return <View style={styles.line}></View>;
};

const styles = StyleSheet.create({
  line: {
    borderWidth: 0.25,
    borderBottomWidth: 0,
    marginVertical: 10,
    opacity: 0.4,
  },
});

export default AppItemSeparator;
