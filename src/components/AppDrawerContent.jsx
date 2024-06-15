import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";

import colors from "../constants/Colors";

import { auth, db } from "../../firebaseConfig";

const AppDrawerContent = (props) => {
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();

  const user = auth.currentUser;
  const userId = user.uid;

  useEffect(() => {
    const userDocRef = doc(db, "users", userId);
    getDoc(userDocRef)
      .then((document) => {
        if (document.exists()) {
          const data = document.data();
          setUserData(data);
        }
      })
      .catch((err) => console.log(err));
  }, [user]);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.avatar}>
        <Avatar
          rounded
          containerStyle={{ backgroundColor: colors.primary }}
          size={"large"}
          title={userData.firstName && userData.firstName.slice(0, 1)}
        />
        {userData && (
          <Text style={styles.text}>
            {userData.firstName} {userData.lastName} {"|"}{" "}
            {userData.accountType}
          </Text>
        )}
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
        onPress={() => {
          auth
            .signOut()
            .then(() => navigation.navigate("Login"))
            .catch((err) => console.log(err));
        }}
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
