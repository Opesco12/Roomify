import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import {
  query,
  collection,
  getDocs,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";

import AppScreen from "../components/AppScreen";
import AppBox from "../components/AppBox";

import { auth, db } from "../../firebaseConfig";

const UserPostsScreen = () => {
  const [data, setData] = useState([]);
  const userId = auth.currentUser.uid;

  const fetchPosts = async () => {
    // const postsQuery = query(
    //   collection(db, "posts"),
    //   where("postedBy", "==", userId),
    //   orderBy("createdAt", "desc")
    // );

    const postsQuery = query(
      collection(db, "posts"),
      where("postedBy", "==", userId)
    );

    const snapshot = await getDocs(postsQuery);
    const postsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setData(postsData);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <AppScreen screen="My Posts">
      {Array.isArray(data) && data.length > 0
        ? data.map((post, index) => (
            <AppBox post={post} key={index} deletable />
          ))
        : null}
    </AppScreen>
  );
};

export default UserPostsScreen;
