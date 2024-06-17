import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Header } from "react-native-elements";
import {
  query,
  where,
  getDocs,
  doc,
  getDoc,
  collection,
} from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

import AppScreen from "../components/AppScreen";
import AppMessagesPreview from "../components/AppMessagePreview";
import colors from "../constants/Colors";

import { db, auth } from "../../firebaseConfig";
import { getConversations } from "../../firebase";

const MessagesScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [conversations, setConversations] = useState([]);
  const navigation = useNavigation();

  const user = auth.currentUser;
  const userId = user.uid;

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const fetchConversations = async () => {
    const conversationsData = await getConversations(userId);
    setConversations(conversationsData);
  };

  useFocusEffect(
    useCallback(() => {
      fetchConversations();
    }, [])
  );

  const handleNavigation = (userId, receiverId, conversationId) => {
    navigation.navigate("Chat", { userId, receiverId, conversationId });
  };

  // const scheduleNotification = async (message) => {
  //   Notifications.setNotificationHandler({
  //     handleNotification: async () => ({
  //       shouldShowAlert: true,
  //       shouldPlaySound: false,
  //       shouldSetBadge: false,
  //     }),
  //   });

  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "New Message",
  //       body: message,
  //     },
  //     trigger: null,
  //   });
  // };

  return (
    <View style={styles.container}>
      <Header
        backgroundColor={colors.primary}
        leftComponent={{
          icon: "menu",
          color: colors.white,
          onPress: toggleDrawer,
        }}
        centerComponent={{
          text: "Messages",
          style: { fontSize: 18, color: colors.white },
        }}
      />
      <View style={styles.messagesContainer}>
        {conversations.length > 0 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={conversations}
            renderItem={({ item }) =>
              item.lastMessage && (
                <AppMessagesPreview
                  userId={userId}
                  item={item}
                  title={"Emmanuel"}
                  subtitle={item.lastMessage.text}
                  onPress={handleNavigation}
                />
              )
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default MessagesScreen;
