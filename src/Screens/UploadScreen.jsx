import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ImageView from "react-native-image-viewing";
import { Asset } from "expo-asset";

import AppScreen from "../components/AppScreen";
import AppFormField from "../components/AppFormField";
import AppButton from "../components/AppButton";
import colors from "../constants/Colors";

const UploadScreen = () => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.string().required("Location is required"),
    price: Yup.number().required("Price is required"),
  });
  const maxValue = 5;
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const pickImage = async () => {
    if (images.length < maxValue) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: maxValue - images.length,
        // allowsEditing: true,
        // aspect: [16, 9],
        quality: 1,
      });

      // console.log(result);
      if (!result.canceled) {
        result.assets.forEach(async (asset) => {
          setImages((prev) => [...prev, { uri: asset.uri }]);
        });
      }
    }
  };
  return (
    <AppScreen>
      <Text>Upload Screen</Text>
      <Formik onSubmit={(values) => console.log(values)} initialValues={{}}>
        {({ handleSubmit }) => (
          <>
            <AppFormField name={"title"} placeholder="Title" />
            <AppFormField
              name={"description"}
              placeholder="Description"
              multiline
              customStyles={styles.textInput}
            />
            <AppFormField name="location" placeholder="Location" />
            <AppFormField name="price" placeholder="Price" />
            <View style={styles.selectImage}>
              <Pressable
                onPress={() => {
                  pickImage();
                }}
                style={{ width: "20%" }}
              >
                <View style={[styles.imagePicker]}>
                  <Text style={[styles.text, { marginBottom: 0 }]}>
                    {images.length > 0 && images.length}
                  </Text>
                  <MaterialCommunityIcons name="chevron-down" size={24} />
                </View>
              </Pressable>
              <View style={styles.previewImage}>
                {images.map((image, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      setCurrentImage(index);
                      setVisible(true);
                    }}
                  >
                    <Image source={{ uri: image.uri }} style={styles.images} />
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </View>
            <Text style={styles.text}>You can select up to 5 images</Text>

            <AppButton text={"Upload"} />
          </>
        )}
      </Formik>
      <ImageView
        images={images}
        imageIndex={currentImage}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        swipeToCloseEnabled={true}
        key={currentImage}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 10,
    flexDirection: "row",
    gap: 5,
    height: 55,
    justifyContent: "center",
  },
  images: {
    borderRadius: 10,
    height: 55,
    width: "18%", // 15% of the parent container
  },
  textInput: {
    height: 90,
  },
  previewImage: {
    flexDirection: "row",
    gap: 3,
    width: "79%",
  },
  selectImage: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    width: "100%",
  },
  text: {
    opacity: 0.5,
    fontSize: 16,
    marginBottom: 20,
  },
});

export default UploadScreen;
