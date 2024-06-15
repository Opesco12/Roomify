import { StyleSheet, Text, View } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { Formik } from "formik";
import * as Yup from "yup";

import AppScreen from "../components/AppScreen";
import AppFormField from "../components/AppFormField";
import AppButtonBg from "../components/AppButton";

import { auth } from "../../firebaseConfig";
import { showMessage } from "react-native-flash-message";

const ForgotPasswordScreen = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please input a valid email")
      .required("Email is required"),
  });
  return (
    <AppScreen screen="Forgot Password">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const { email } = values;
          sendPasswordResetEmail(auth, email)
            .then(() => {
              showMessage({
                message: "Password reset link has been sent to your email",
                type: "success",
              });
            })
            .catch((err) => {
              console.log(err);
              showMessage({
                message: "Error sending password reset link",
                type: "info",
              });
            });
        }}
      >
        {({ handleSubmit }) => (
          <>
            <View style={{ marginTop: 10 }}>
              <AppFormField
                placeholder={"Email"}
                type={"email-address"}
                name="email"
              />
              <AppButtonBg
                text={"Send password reset link"}
                onPress={handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>
    </AppScreen>
  );
};

export default ForgotPasswordScreen;
