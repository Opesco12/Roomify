import { StyleSheet, View, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import AppButtonBg from "../components/AppButton";
import AppFormField from "../components/AppFormField";
import colors from "../constants/Colors";
import LargeText from "../components/AppLargeText";
import AppScreen from "../components/AppScreen";

const LoginScreen = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please input a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must contain at least 5 characters")
      .required("Password is required "),
  });
  return (
    <AppScreen>
      <LargeText>Log in to your account</LargeText>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
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
                style={[styles.text, { marginBottom: 0, textAlign: "right" }]}
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
        <Text style={{ color: colors.primary }}>Sign Up</Text>
      </Text>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
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
