import { StyleSheet, Text, View } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  query,
  getDocs,
  where,
  orderBy,
} from "firebase/firestore";

import AppScreen from "../components/AppScreen";
import AppChatWrapper from "../components/AppChatWrapper";
import colors from "../constants/Colors";

import { auth, db } from "../../firebaseConfig";

import {
  createConversation,
  addMessage,
  getConversations,
  getMessages,
} from "../../firebase";

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  function arraysHaveSameContent(arr1, arr2) {
    return arr1.every((item) => arr2.some((el) => el === item));
  }

  const getData = useCallback(async () => {
    let user, receiver;

    if (route.params.userId && route.params.receiverId) {
      user = route.params.userId;
      receiver = route.params.receiverId;
    } else {
      user = auth.currentUser.uid;
      receiver = route.params.id;
    }

    setUserId(user);
    setReceiverId(receiver);

    const userRef = doc(db, "users", user);
    const receiverRef = doc(db, "users", receiver);

    try {
      const [userSnapshot, receiverSnapshot] = await Promise.all([
        getDoc(userRef),
        getDoc(receiverRef),
      ]);

      setCurrentUser(userSnapshot.data());
      setReceiver(receiverSnapshot.data());

      if (route.params.conversationId) {
        setConversationId(route.params.conversationId);
      } else {
        const participants = [user, receiver];
        const conversationsData = await getConversations(user);
        const existingConversation = conversationsData.find(
          (convo) =>
            convo && arraysHaveSameContent(convo.participants, participants)
        );

        if (existingConversation) {
          setConversationId(existingConversation.id);
        } else {
          const newConversationId = await createConversation(participants);
          setConversationId(newConversationId);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [route.params]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const messagesQuery = query(
      collection(db, "messages"),
      where("conversationId", "==", conversationId),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const messagesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt && data.createdAt.toDate();
        return {
          _id: doc.id,
          createdAt,
          text: doc.data().text,
          user: doc.data().user,
        };
      });
      setMessages(messagesData);
    });

    return unsubscribe;
  }, [conversationId]);

  const onSend = useCallback(
    (newMessages = []) => {
      newMessages.forEach(async (message) =>
        addMessage(userId, currentUser.firstName, conversationId, message)
      );
    },
    [conversationId]
  );

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header
        backgroundColor={colors.primary}
        leftComponent={{
          icon: "arrow-back",
          color: "#fff",
          onPress: () => navigation.goBack(),
        }}
        centerComponent={{
          text: receiver && receiver.firstName,
          style: { color: "#fff", fontSize: 18 },
        }}
      />
      <AppChatWrapper
        messages={messages}
        onSend={onSend}
        user={{ _id: userId }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ChatScreen;
