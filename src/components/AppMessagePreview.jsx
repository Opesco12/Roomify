import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";

import colors from "../constants/Colors";
import AppItemSeparator from "./AppItemSeparator";

const AppMessagesPreview = ({ title, subtitle, onPress }) => {
  const colors = [
    "#2C3E50",
    "#34495E",
    "#7F8C8D",
    "#95A5A6",
    "#BDC3C7",
    "#ECF0F1",
    "#1ABC9C",
    "#16A085",
    "#2ECC71",
    "#27AE60",
    "#3498DB",
    "#2980B9",
    "#9B59B6",
    "#8E44AD",
    "#34495E",
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  const avatarTitle = title.slice(0, 1);
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Avatar
            rounded
            size={"medium"}
            containerStyle={{ backgroundColor: randomColor }}
            title={avatarTitle}
          />
          <View style={styles.messagePreview}>
            <Text
              numberOfLines={1}
              style={[styles.text, { fontWeight: "500" }]}
            >
              {title}
            </Text>
            <Text numberOfLines={1} style={styles.text}>
              {subtitle}
            </Text>
          </View>
        </View>
        <AppItemSeparator />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
    marginVertical: 5,
    width: "100%",
  },
  image: {
    backgroundColor: colors.black,
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  messagePreview: {
    flex: 1,
    gap: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default AppMessagesPreview;
