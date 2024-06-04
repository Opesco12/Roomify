import { StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";

import AppScreen from "../components/AppScreen";

import AppSearchBar from "../components/AppSearchBar";

const SearchScreen = () => {
  return (
    <AppScreen>
      <Text>Search Screen</Text>
      <AppSearchBar />
    </AppScreen>
  );
};

export default SearchScreen;
