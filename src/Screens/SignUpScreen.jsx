import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { showMessage } from "react-native-flash-message";
import * as Yup from "yup";
import { Formik } from "formik";

import AppHeader from "../components/AppHeader";
import colors from "../constants/Colors";
import LargeText from "../components/AppLargeText";
import AppFormField from "../components/AppFormField";
import AppButtonBg from "../components/AppButton";
import AppPicker from "../components/AppPicker";

import { db, auth } from "../../firebaseConfig";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
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

        return setDoc(userDocRef, userData);
      })
      .then(() => {
        showMessage({
          message: "Account succesfully created",
          type: "success",
        });
        setIsSubmitting(false);
        handleNavigation("Index");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          showMessage({
            message: "The email address is already in use by another account.",
            type: "warning",
          });
          setIsSubmitting(false);
        } else {
          showMessage({ message: error.message, type: "warning" });
          setIsSubmitting(false);
        }
      });
  };

  const options = [
    {
      label: "Student",
      value: "Student",
    },
    { label: "Agent", value: "Agent" },
  ];

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
    accountType: Yup.string().required("Please select an item"),
  });
  return (
    <View style={styles.container}>
      <AppHeader
        backgroundColor={colors.primary}
        centerComponent={{
          text: "Sign Up",
          style: { color: colors.white, fontSize: 18 },
        }}
      />
      <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LargeText>Create an account</LargeText>
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
              accountType: "",
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
            {({
              handleSubmit,
              values,
              setFieldValue,
              setFieldTouched,
              touched,
              errors,
            }) => (
              <View>
                <AppFormField name="firstName" placeholder={"First Name"} />
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
                  autoCapitalize={false}
                />
                <AppFormField
                  placeholder={"Confirm Password"}
                  name={"confirmPassword"}
                  secureTextEntry
                  autoCapitalize={false}
                />
                <AppPicker
                  placeholder={"Select Account Type"}
                  options={options}
                  onValueChange={(value) => {
                    setFieldValue("accountType", value);
                    setFieldTouched("accountType", value);
                  }}
                  value={values.accountType}
                />
                {touched.accountType && errors.accountType && (
                  <Text style={styles.error}>{errors.accountType}</Text>
                )}

                <AppButtonBg
                  text={
                    isSubmitting ? (
                      <ActivityIndicator color={colors.white} size={"small"} />
                    ) : (
                      "Register Now"
                    )
                  }
                  onPress={handleSubmit}
                />
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
        </ScrollView>
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
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  error: {
    color: colors.error,
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default SignUp;
