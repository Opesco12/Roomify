import { StyleSheet, Text, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import colors from "../constants/Colors";

const AppDrawerContent = (props) => {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.avatar}>
        <Avatar
          rounded
          containerStyle={{ backgroundColor: colors.primary }}
          size={"large"}
          title="E"
        />
        <Text style={styles.text}>Emmanuel Oyeleke | Student</Text>
      </View>
      <DrawerItem
        label="My Posts"
        icon={({ size }) => <Icon name="send" size={size} />}
        labelStyle={{ fontSize: 16 }}
        style={{
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderColor: colors.light,
        }}
        onPress={() => navigation.navigate("MyPosts")}
      />
      <DrawerItem
        label="Change Password"
        icon={({ size }) => <Icon name="lock" size={size} />}
        labelStyle={{ fontSize: 16 }}
        style={{ borderBottomWidth: 1, borderBottomColor: colors.light }}
        onPress={() => navigation.navigate("ChangePassword")}
      />
      <DrawerItem
        label="Logout"
        icon={({ size }) => <Icon name="logout" size={size} />}
        labelStyle={{ fontSize: 16 }}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 10,
  },
});

export default AppDrawerContent;
