import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";

import AppButtonBg from "../components/AppButton";
import AppFormField from "../components/AppFormField";
import colors from "../constants/Colors";
import LargeText from "../components/AppLargeText";
import AppScreen from "../components/AppScreen";
import AppHeader from "../components/AppHeader";

import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { showMessage } from "react-native-flash-message";

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const handleSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        showMessage({ message: "Login Successful", type: "success" });
        handleNavigation("Index");
      })
      .catch((error) => {
        showMessage({ message: "Invalid email or password", type: "warning" });
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please input a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required "),
  });

  return (
    <View style={styles.container}>
      <AppHeader
        backgroundColor={colors.primary}
        centerComponent={{
          text: "Login",
          style: { color: colors.white, fontSize: 18 },
        }}
      />
      <View style={styles.comp}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <LargeText>Log in to your account</LargeText>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const { email, password } = values;

              handleSignIn(email, password);
            }}
          >
            {({ handleSubmit }) => (
              <>
                <View>
                  <AppFormField
                    placeholder={"Email"}
                    type={"email-address"}
                    name="email"
                    autoFocus
                  />
                  <AppFormField
                    placeholder={"Password"}
                    secureTextEntry
                    name="password"
                  />
                  <Text
                    style={[
                      styles.text,
                      { marginBottom: 0, textAlign: "right" },
                    ]}
                  >
                    Forgot Password?
                  </Text>
                  <AppButtonBg text={"Login"} onPress={handleSubmit} />
                </View>
              </>
            )}
          </Formik>
          <Text style={styles.bottomText}>
            Don't have an account?
            <Text
              style={{ color: colors.primary }}
              onPress={() => handleNavigation("Signup")}
            >
              Sign Up
            </Text>
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  comp: {
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 40,
    opacity: 0.5,
  },
  bottomText: {
    alignItems: "center",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 15,
  },
});

export default LoginScreen;
