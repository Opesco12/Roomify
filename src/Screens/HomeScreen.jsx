import { BackHandler, Alert, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import AppScreen from "../components/AppScreen";
import AppBox from "../components/AppBox";
import colors from "../constants/Colors";

import { db } from "../../firebaseConfig";

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const postCollectionRef = collection(db, "posts");
  const [name, setName] = useState(null);

  const fetchPosts = () => {
    try {
      const q = query(postCollectionRef, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() });
        });
        setPosts(posts);
      });

      return unsubscribe;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = fetchPosts();

    return unsubscribe;
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        "Exit App",
        "Do you want to exit?",
        [
          {
            text: "Cancel",
            onPress: () => {
              // Do nothing
            },
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => backHandler.remove();
  }, []);

  return (
    <AppScreen screen="Home">
      <View style={styles.container}>
        {posts.length > 0 ? (
          posts.map((post, index) => <AppBox key={index} post={post} />)
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40%",
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 18, opacity: 0.7 }}>No posts yet</Text>
          </View>
        )}
      </View>
    </AppScreen>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
