import { StyleSheet, Text, View } from "react-native";

const LargeText = ({ children }) => {
  return <Text style={styles.largeText}>{children}</Text>;
};

const styles = StyleSheet.create({
  largeText: {
    fontSize: 30,
    fontWeight: "600",
    marginVertical: 35,
  },
});

export default LargeText;
