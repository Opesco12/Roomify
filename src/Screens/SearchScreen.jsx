import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { SearchBar, Icon } from "react-native-elements";

import AppScreen from "../components/AppScreen";
import AppSearchBar from "../components/AppSearchBar";
import colors from "../constants/Colors";

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  return (
    <AppScreen screen="Search">
      <SearchBar
        placeholder="Type here..."
        value={search}
        onChangeText={(text) => setSearch(text)}
        containerStyle={{
          backgroundColor: colors.white,
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
        round
        lightTheme
        showCancel
        onBlur={() => console.log(search)}
      />
    </AppScreen>
  );
};

export default SearchScreen;
