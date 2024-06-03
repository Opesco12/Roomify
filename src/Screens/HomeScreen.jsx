import { StyleSheet, Text, View } from "react-native";

import AppScreen from "../components/AppScreen";
import AppBox from "../components/AppBox";

const HomeScreen = () => {
  const images = [
    require("../assets/images/house_1.jpg"),
    require("../assets/images/house_2.jpg"),
    require("../assets/images/house_3.jpg"),
  ];
  return (
    <AppScreen>
      <Text>Home Screen</Text>
      <AppBox />
      <AppBox />
      <AppBox />
    </AppScreen>
  );
};
const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
