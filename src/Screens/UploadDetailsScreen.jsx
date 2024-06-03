import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useState } from "react";
import Swiper from "react-native-swiper";
import ImageView from "react-native-image-viewing";
import { Ionicons } from "@expo/vector-icons";

import AppScreen from "../components/AppScreen";
import colors from "../constants/Colors";

const UploadDetailsScreen = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [visible, setVisible] = useState(false);

  const statusBarHeight = StatusBar.currentHeight;
  const images = [
    require("../assets/images/house_1.jpg"),
    require("../assets/images/house_2.jpg"),
    require("../assets/images/house_3.jpg"),
  ];
  return (
    <View
      style={[
        styles.container,
        {
          //   paddingTop: visible ? 0 : statusBarHeight,
        },
      ]}
    >
      <View style={styles.images}>
        <Swiper
          style={{ height: "100%" }}
          autoplay={true}
          autoplayTimeout={5}
          activeDotColor={colors.primary}
          showsButtons={true}
        >
          {images.map((image, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                setCurrentImage(index);
                setVisible(true);
              }}
            >
              <Image source={image} style={styles.image} />
            </TouchableWithoutFeedback>
          ))}
        </Swiper>
      </View>
      <View style={styles.details}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={styles.topDetails}>
          <Text style={[styles.text, { fontSize: 18, fontWeight: "600" }]}>
            One Room Self Contain
          </Text>
          <Ionicons name="chatbubble-ellipses-outline" size={24} />
        </View>
        <Text style={styles.text}>
          Basic Rent: ₦{(100000).toLocaleString("en-US")}
        </Text>
        <Text style={styles.text}>Location: Oke-Odo</Text>
        <Text style={styles.text}>
          Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nulla euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc,
          quis aliquam nisl nunc eu nisl. Sed euismod, nulla sit amet aliquam
          lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.
          Sed euismod, nulla sit amet aliquam lacinia, nisl nisl aliquam nisl,
          nec aliquam nisl nisl sit amet nisl.
        </Text>
        <Text style={styles.text}>Posted by:Agent Opeyemi</Text>
        {/* </ScrollView> */}
      </View>
      <ImageView
        images={images}
        imageIndex={currentImage}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        swipeToCloseEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  details: {
    backgroundColor: colors.white,
    height: "35%",
    justifyContent: "space-between",
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
  },
  topDetails: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default UploadDetailsScreen;
