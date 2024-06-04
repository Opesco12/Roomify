import { Stylesheet, Text, View } from "react-native";

import AppScreen from "../components/AppScreen";

const PostsScreen = () => {
  return <AppScreen screen={"Posts"} leftComponent={"arrow-left"}></AppScreen>;
};

const styles = StyleSheet.create({
  container: {},
});

export default PostsScreen;
