import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../constants/Colors";

const AppButtonBg = ({ text, compStyle, onPress, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.button,
          compStyle,
          { backgroundColor: colors.primary, borderWidth: 0 },
        ]}
      >
        <Text style={{ color: colors.white, fontSize: 18, fontWeight: 600 }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
    height: 55,
  },
});

export default AppButtonBg;
