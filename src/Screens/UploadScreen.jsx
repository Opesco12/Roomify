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

import {
  getStorage,
  uploadBytesResumable,
  uploadBytes,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import AppScreen from "../components/AppScreen";
import AppFormField from "../components/AppFormField";
import AppButton from "../components/AppButton";
import colors from "../constants/Colors";

import { storageRef, db } from "../../firebaseConfig";

const UploadScreen = () => {
  const imagesRef = ref(storageRef, "images");

  const uploadImages = async (images) => {
    const uploadTasks = [];
    const downloadUrls = [];

    for (const image of images) {
      try {
        const fileName = await `${Date.now()}_${image.fileName}`;
        const fileRef = await ref(imagesRef, fileName);

        const response = await fetch(image.uri);
        const blob = await response.blob();

        const uploadTask = await uploadBytes(fileRef, blob);
        uploadTasks.push(uploadTask);

        const downloadUrl = await getDownloadURL(uploadTask.ref);
        downloadUrls.push(downloadUrl);
      } catch (err) {
        console.log("unable to upload files", err);
      }
      setImageUrls(downloadUrls);
    }
  };

  const createPost = async () => {
    try {
      console.log("Got here");
      const docRef = await addDoc(collection(db, "users"), {
        firstName: "Emmanuel",
        lastName: "Oyeleke",
      });
      console.log("then here");
      console.log("Document uploaded with ID: ", docRef.id);
    } catch (err) {
      console.log("Error adding post", err);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.string().required("Location is required"),
    price: Yup.number("Price must be a number").required("Price is required"),
    images: Yup.array()
      .required("Select at least one image")
      .min(1, "Select at least one image")
      .test("fileFormat", "Unsupported File Format", (values) =>
        values.every(
          (value) => typeof value === "object" && value.uri && value.fileName
        )
      ),
  });

  const maxValue = 5;
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [post, setPost] = useState({});

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
          setImages((prev) => [
            ...prev,
            { uri: asset.uri, fileName: asset.fileName },
          ]);
        });
      }
    }
  };
  return (
    <AppScreen screen="Upload">
      <View style={styles.formContainer}>
        <Formik
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            console.log("Got here");
            setSubmitting(false);
          }}
          initialValues={{
            title: "heyy",
            description: "",
            location: "",
            price: "",
            images: images.length > 0 ? images : undefined,
          }}
        >
          {({ handleSubmit, isSubmitting, errors }) => (
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
                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={24}
                      color={colors.black}
                    />
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
                      <Image
                        source={{ uri: image.uri }}
                        style={styles.images}
                      />
                    </TouchableWithoutFeedback>
                  ))}
                </View>
              </View>
              <Text
                style={[
                  styles.text,
                  {
                    color: errors.images ? colors.error : colors.black,
                    opacity: errors.images ? 1 : 0.5,
                  },
                ]}
              >
                {errors.images
                  ? errors.images
                  : "You can select up to 5 images"}
              </Text>

              <AppButton
                text={"Upload"}
                onPress={handleSubmit}
                disabled={isSubmitting}
              />
            </>
          )}
        </Formik>
      </View>
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
  formContainer: {
    marginTop: 20,
  },
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
    fontSize: 14,
    marginBottom: 20,
  },
});

export default UploadScreen;
