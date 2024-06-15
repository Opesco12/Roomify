import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { SearchBar, Icon } from "react-native-elements";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";

import AppScreen from "../components/AppScreen";
import AppSearchBar from "../components/AppSearchBar";
import colors from "../constants/Colors";
import AppBox from "../components/AppBox";

import { db } from "../../firebaseConfig";

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const fetchPosts = async () => {
    const postsQuery = query(
      collection(db, "posts"),
      where("location", "==", search),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(postsQuery);
    const postsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setData(postsData);
  };
  return (
    <AppScreen screen="Search">
      <SearchBar
        placeholder="Type here"
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
        onBlur={fetchPosts}
      />

      {Array.isArray(data) && data.length > 0
        ? data.map((post, index) => <AppBox post={post} key={index} />)
        : null}
    </AppScreen>
  );
};

export default SearchScreen;
