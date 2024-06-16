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

  return (
    <View style={styles.container}>
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
        }}
      >
        {({ handleSubmit }) => (
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
  text: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default StudentSignUp;
