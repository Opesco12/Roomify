import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import colors from "../constants/Colors";

const AppBox = ({ post }) => {
  const navigation = useNavigation();
  const thumbnailImages =
    post.images.length > 1 ? post.images.slice(0, 2) : post.images[0];
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Details", post)}
    >
      <View style={styles.container}>
        <View style={styles.top}>
          {post.images.length > 1 ? (
            thumbnailImages.map((image, index) => (
              <Image src={image} key={index} style={styles.images} />
            ))
          ) : (
            <Image src={post.images[0]} style={styles.image} />
          )}
        </View>
        <View style={styles.bottom}>
          <Text style={[styles.text, { fontWeight: "600" }]}>{post.title}</Text>
          <Text numberOfLines={1} style={styles.text}>
            Location: {post.location}
          </Text>
          <Text style={styles.text}>
            Price: ₦{post.price.toLocaleString("en-US")}
          </Text>
          <View style={styles.request}>
            <AntDesign name="star" color={colors.white} size={15} />
            <Text
              style={{ fontSize: 14, fontWeight: "500", color: colors.white }}
            >
              {post.type}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  bottom: {
    marginVertical: 5,
    padding: 5,
  },
  container: {
    backgroundColor: colors.light,
    borderRadius: 15,
    elevation: 2,
    height: 350,
    marginVertical: 10,
    overflow: "hidden",
  },
  images: {
    height: "100%",
    width: "50%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  request: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 5,
    padding: 2,
  },
  top: {
    flexDirection: "row",
    height: "70%",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default AppBox;
