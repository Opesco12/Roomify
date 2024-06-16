import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
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
                  />
                  <AppFormField
                    placeholder={"Password"}
                    secureTextEntry
                    name="password"
                  />
                  <Pressable
                    onPress={() => navigation.navigate("ForgotPassword")}
                  >
                    <Text
                      style={[
                        styles.text,
                        { marginBottom: 5, textAlign: "right" },
                      ]}
                    >
                      Forgot Password?
                    </Text>
                  </Pressable>
                  <AppButtonBg text={"Login"} onPress={handleSubmit} />
                </View>
              </>
            )}
          </Formik>
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>Don't have an account?</Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={{ color: colors.primary }}>Sign Up</Text>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    alignSelf: "center",
    flexDirection: "row",
    gap: 5,
  },
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
    fontWeight: "500",
    fontSize: 15,
  },
});

export default LoginScreen;
