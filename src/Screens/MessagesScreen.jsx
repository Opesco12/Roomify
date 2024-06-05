import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Header } from "react-native-elements";

import AppScreen from "../components/AppScreen";
import AppMessagesPreview from "../components/AppMessagePreview";
import colors from "../constants/Colors";

const MessagesScreen = () => {
  const navigation = useNavigation();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const messages = [
    {
      name: "Emmanuel",
      message:
        "Hey bro, How much is the basic rent. I'm really interested in the apartment",
    },
    { name: "Opeyemi", message: "Good morning, how much is it?" },
    { name: "Victor", message: "Good morning, how much is it?" },
    { name: "Glory", message: "Good morning, how much is it?" },
    { name: "Esther", message: "Good morning, how much is it?" },
    { name: "Divine", message: "Good morning, how much is it?" },
    { name: "Emmanuel", message: "Good morning, how much is it?" },
    { name: "James", message: "Good morning, how much is it?" },
    { name: "John", message: "Good morning, how much is it?" },
    { name: "Opeyemi", message: "Good morning, how much is it?" },
    { name: "Opeyemi", message: "Good morning, how much is it?" },
    { name: "Opeyemi", message: "Good morning, how much is it?" },
  ];

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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <AppMessagesPreview title={item.name} subtitle={item.message} />
          )}
        />
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
