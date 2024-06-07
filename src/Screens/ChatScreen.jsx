import { StyleSheet, Text, View } from "react-native";
import { useState, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import AppScreen from "../components/AppScreen";
import colors from "../constants/Colors";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "Hey there!",
      createdAt: new Date(Date.UTC(2023, 4, 20, 10, 0, 0)),
      user: {
        _id: 1,
        name: "John",
      },
    },
    {
      _id: 2,
      text: "Hi! How are you?",
      createdAt: new Date(Date.UTC(2023, 4, 20, 10, 1, 0)),
      user: {
        _id: 2,
        name: "Sarah",
      },
    },
    {
      _id: 3,
      text: "I'm doing great, thanks! How about you?",
      createdAt: new Date(Date.UTC(2023, 4, 20, 10, 2, 0)),
      user: {
        _id: 1,
        name: "John",
      },
    },
    {
      _id: 4,
      text: "I'm good too! Just working on a project.",
      createdAt: new Date(Date.UTC(2023, 4, 20, 10, 3, 0)),
      user: {
        _id: 2,
        name: "Sarah",
      },
    },
    {
      _id: 5,
      text: "That's great! What kind of project is it?",
      createdAt: new Date(Date.UTC(2023, 4, 20, 10, 4, 0)),
      user: {
        _id: 1,
        name: "John",
      },
    },
    {
      _id: 6,
      text: "It's a mobile app I'm developing using React Native.",
      createdAt: new Date(Date.UTC(2023, 4, 20, 10, 5, 0)),
      user: {
        _id: 2,
        name: "Sarah",
      },
    },
    {
      _id: 7,
      text: "Wow, that sounds interesting! How's it coming along?",
      createdAt: new Date(Date.UTC(2023, 4, 20, 10, 6, 0)),
      user: {
        _id: 1,
        name: "John",
      },
    },
    {
      _id: 8,
      text: "It's going well so far. I'm learning a lot in the process.",
      createdAt: new Date(Date.UTC(2023, 4, 20, 10, 7, 0)),
      user: {
        _id: 2,
        name: "Sarah",
      },
    },
    {
      _id: 9,
      text: "That's awesome! Let me know if you need any help or feedback.",
      createdAt: new Date(Date.UTC(2023, 4, 20, 10, 8, 0)),
      user: {
        _id: 1,
        name: "John",
      },
    },
    {
      _id: 10,
      text: "Thanks, I appreciate that! I'll definitely reach out if I need anything.",
      createdAt: new Date(Date.UTC(2023, 4, 20, 10, 9, 0)),
      user: {
        _id: 2,
        name: "Sarah",
      },
    },
  ]);

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
          text: "Sarah",
          style: { color: "#fff", fontSize: 18 },
        }}
      />
      <GiftedChat
        messages={messages}
        onSend={(newMessages) =>
          setMessages(GiftedChat.append(messages, newMessages))
        }
        user={{ _id: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ChatScreen;
