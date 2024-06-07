import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../constants/Colors";

const AppBox = () => {
  const navigation = useNavigation();
  const images = [
    require("../assets/images/house_1.jpg"),
    require("../assets/images/house_2.jpg"),
    require("../assets/images/house_3.jpg"),
  ];
  const thumbnailImages = images.length > 1 && images.slice(0, 2);
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Details")}>
      <View style={styles.container}>
        <View style={styles.top}>
          {thumbnailImages.map((image, index) => (
            <Image source={image} key={index} style={styles.images} />
          ))}
        </View>
        <View style={styles.bottom}>
          <Text style={[styles.text, { fontWeight: "600" }]}>
            A room self contain at Sanrab
          </Text>
          <Text style={styles.text}>Sanrab</Text>
          <Text style={styles.text}> ₦{(100000).toLocaleString("en-US")}</Text>
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
    // left: 20,
    // position: "absolute",
    // top: 20,
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
