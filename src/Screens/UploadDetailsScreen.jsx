import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import ImageView from "react-native-image-viewing";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";

import AppScreen from "../components/AppScreen";
import colors from "../constants/Colors";

import { db, auth } from "../../firebaseConfig";

const UploadDetailsScreen = ({ route }) => {
  const [postedBy, setPostedBy] = useState(null);
  const post = route.params;
  console.log(post);

  const userId = auth.currentUser.uid;

  const getPostedBy = async () => {
    const docRef = doc(db, "users", post.postedBy);

    getDoc(docRef)
      .then((snapshot) => {
        const user = snapshot.data();
        const name = user.firstName + " " + user.lastName;
        setPostedBy(name);
      })
      .catch((err) => console.log(err));
  };

  const navigation = useNavigation();
  const [currentImage, setCurrentImage] = useState(null);
  const [visible, setVisible] = useState(false);

  const statusBarHeight = StatusBar.currentHeight;
  useEffect(() => {
    getPostedBy();
  }, []);
  return (
    <View
      style={[
        styles.container,
        {
          // paddingTop: visible ? 0 : statusBarHeight,
        },
      ]}
    >
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View
          style={[
            styles.backButton,
            {
              top: statusBarHeight + 5,
            },
          ]}
        >
          <Ionicons name="arrow-back" size={24} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.images}>
        <Swiper
          style={{ height: "100%" }}
          autoplay={true}
          autoplayTimeout={5}
          activeDotColor={colors.primary}
          showsButtons={true}
        >
          {post.images.map((image, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                setCurrentImage(index);
                setVisible(true);
              }}
            >
              <Image src={image} style={styles.image} />
            </TouchableWithoutFeedback>
          ))}
        </Swiper>
      </View>
      <View style={styles.details}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topDetails}>
            <Text style={[styles.text, { fontSize: 18, fontWeight: "600" }]}>
              {post.title}
            </Text>
            {userId !== post.postedBy && (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                onPress={() =>
                  navigation.navigate("Chat", { postedBy, id: post.postedBy })
                }
              />
            )}
          </View>
          <Text style={styles.text}>
            Basic Rent: ₦{post.price.toLocaleString("en-US")}
          </Text>
          <Text style={styles.text}>Location: {post.location}</Text>
          <Text style={styles.text}>{post.description}</Text>
          {post.roommateDescription && (
            <Text style={[styles.text, { fontSize: 17, fontWeight: "600" }]}>
              Description of room mate needed
            </Text>
          )}
          {post.roommateDescription && (
            <Text style={styles.text}>{post.roommateDescription}</Text>
          )}
          <Text style={styles.text}>Posted by: {postedBy}</Text>
        </ScrollView>
      </View>
      <ImageView
        images={post.images.map((image) => ({ uri: image }))}
        imageIndex={currentImage}
        key={post.images}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        swipeToCloseEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 25,
    height: 40,
    justifyContent: "center",
    left: 10,
    position: "absolute",
    width: 40,
    zIndex: 3,
  },
  container: {
    flex: 1,
  },
  details: {
    backgroundColor: colors.white,
    height: "35%",

    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  images: {
    height: "65%",
  },
  image: {
    height: 600,
    width: "100%",
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
  topDetails: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default UploadDetailsScreen;
