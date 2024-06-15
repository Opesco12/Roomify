import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ImageView from "react-native-image-viewing";
import { showMessage } from "react-native-flash-message";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

import AppScreen from "../components/AppScreen";
import AppFormField from "../components/AppFormField";
import AppButton from "../components/AppButton";
import colors from "../constants/Colors";

import { storageRef, db, auth } from "../../firebaseConfig";

const UploadScreen = () => {
  const userId = auth.currentUser.uid;
  const maxValue = 5;
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const userRef = doc(db, "users", userId);

    const snapshot = await getDoc(userRef);
    setUser(snapshot.data());
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );

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
        console.log("unable to upload images", err);
      }
    }
    // await setImageUrls(downloadUrls);
    return downloadUrls;
  };

  const createPost = (
    title,
    description,
    location,
    price,
    images,
    roommateDescription
  ) => {
    addDoc(collection(db, "posts"), {
      title,
      description,
      roommateDescription,
      location,
      price,
      images,
      postedBy: userId,
      createdAt: serverTimestamp(),
      type:
        user && user.accountType === "Student"
          ? "Roommate Request"
          : "Agent Listing",
    })
      .then(() => {
        showMessage({
          message: "Post Uploaded",
          type: "success",
        });
      })
      .catch((err) => console.log(err));
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.string().required("Location is required"),
    price: Yup.number("Price must be a number").required("Price is required"),
    roommateDescription: Yup.string(),
  });

  const handleRemove = (imageIndex) => {
    const newImages = images.filter((image, index) => index !== imageIndex);
    setImages(newImages);
  };

  return (
    <AppScreen screen="Upload">
      <View style={styles.formContainer}>
        <Formik
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const { title, description, location, price, roommateDescription } =
              values;

            if (!images.length >= 1) {
              showMessage({ message: "Add images from gallery to upload" });
            } else {
              setIsSubmitting(true);
              uploadImages(images)
                .then((downloadUrls) => {
                  createPost(
                    title,
                    description,
                    location,
                    price,
                    downloadUrls,
                    roommateDescription
                  );
                  setImages([]);
                  resetForm();
                  setTimeout(() => {
                    setIsSubmitting(false);
                  }, 1000);
                })
                .catch((err) => {
                  showMessage({
                    message: "An error occured while creating post",
                    type: "info",
                  });
                  console.log(err);
                });
            }
          }}
          initialValues={{
            title: "",
            description: "",
            location: "",
            price: "",
            roommateDescription: "",
          }}
        >
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
              {user && user.accountType === "Student" && (
                <AppFormField
                  name="roommateDescription"
                  placeholder="Roomate Description"
                  multiline
                  customStyles={styles.textInput}
                />
              )}

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
                    <View key={index} style={styles.imagesContainer}>
                      <TouchableWithoutFeedback
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

                      <MaterialIcons
                        name="cancel"
                        size={20}
                        style={styles.cancelIcon}
                        onPress={() => handleRemove(index)}
                      />
                    </View>
                  ))}
                </View>
              </View>
              <Text style={[styles.text]}>You can select up to 5 images</Text>

              <AppButton
                text={
                  isSubmitting ? (
                    <ActivityIndicator size={"small"} color={colors.white} />
                  ) : user && user.accountType === "Student" ? (
                    "Upload Roommate Request"
                  ) : (
                    "Upload"
                  )
                }
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
  cancelIcon: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  imagesContainer: {
    height: 55,
    overflow: "hidden",
    width: "18%",
  },
  images: {
    borderRadius: 10,
    height: "100%",
    width: "100%",
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
