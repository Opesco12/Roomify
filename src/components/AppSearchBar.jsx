import { StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import colors from "../constants/Colors";

const AppSearchBar = ({ handleSearch, style, value }) => {
  const [search, setSearch] = useState("");

  const handleTextChange = (newText) => {
    setSearch(newText);
  };

  useEffect(() => {
    if (value) {
      setSearch(value);
      handleSearch(value);
    }
  }, [value]);
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder="Search"
        style={styles.input}
        value={search}
        onChangeText={handleTextChange}
      />
      <Feather
        name="search"
        size={24}
        onPress={() => {
          if (search.length > 0) handleSearch(search);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    paddingHorizontal: 15,
    height: 55,
  },
  input: {
    height: "100%",
    fontSize: 18,
    fontWeight: "500",
    width: "90%",
  },
});

export default AppSearchBar;
