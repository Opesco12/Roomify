import { Text, View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import AppScreen from "../../components/AppScreen";
import AppFormField from "../../components/AppFormField";
import AppButtonBg from "../../components/AppButton";
import LargeText from "../../components/AppLargeText";
import colors from "../../constants/Colors";

import { db, auth } from "../../../firebaseConfig";

const StudentSignUp = () => {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };
  const handleSignUp = (
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    accountType
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;
        const userDocRef = doc(db, "users", userId);
        const userData = {
          firstName,
          lastName,
          phoneNumber,
          accountType,
        };

        console.log(userId);
        console.log(userDocRef);

        return setDoc(userDocRef, userData);
      })
      .then(() => {
        showMessage({
          message: "Account succesfully created",
          type: "success",
        });

        handleNavigation("Index");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          showMessage({
            message: "The email address is already in use by another account.",
            type: "warning",
          });
        } else {
          showMessage({ message: error.message, type: "warning" });
        }
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please input a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must contain at least 5 characters")
      .required("Password is required "),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwprds must match")
      .required("Confirm Password is required"),
    firstName: Yup.string().min(1).required("First Name is required"),
    lastName: Yup.string().min(1).required("Last Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
  });
  return (
    <View style={styles.container}>
      <LargeText>Create an account as a student</LargeText>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          accountType: "Student",
          confirmPassword: "",
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          phoneNumber: "",
        }}
        onSubmit={(values) => {
          const {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            accountType,
          } = values;
          handleSignUp(
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            accountType
          );
        }}
      >
        {({ handleSubmit, values }) => (
          <View>
            <AppFormField
              autoFocus
              name="firstName"
              placeholder={"First Name"}
            />
            <AppFormField name="lastName" placeholder={"Last Name"} />
            <AppFormField
              name={"email"}
              type="email-address"
              placeholder="Email"
            />
            <AppFormField
              placeholder={"Phone Number"}
              name={"phoneNumber"}
              type="number-pad"
            />
            <AppFormField
              placeholder={"Password"}
              name={"password"}
              secureTextEntry
            />
            <AppFormField
              placeholder={"Confirm Password"}
              name={"confirmPassword"}
              secureTextEntry
            />

            <AppButtonBg text={"Register Now"} onPress={handleSubmit} />
          </View>
        )}
      </Formik>

      <View style={styles.bottomText}>
        <Text style={styles.text}>Already have an account? </Text>
        <Pressable
          style={{ justifyContent: "center" }}
          onPress={() => handleNavigation("Login")}
        >
          <Text style={{ color: colors.primary, fontWeight: "500" }}>
            Log in
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomText: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  container: { backgroundColor: colors.white, flex: 1 },
  text: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default StudentSignUp;
