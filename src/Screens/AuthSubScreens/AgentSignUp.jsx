import { Text, View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import AppScreen from "../../components/AppScreen";
import AppFormField from "../../components/AppFormField";
import AppButtonBg from "../../components/AppButton";
import LargeText from "../../components/AppLargeText";
import colors from "../../constants/Colors";

const AgentSignUp = () => {
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
      <LargeText>Create an account as an agent</LargeText>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          accountType: "Agent",
          confirmPassword: "",
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          phoneNumber: "",
        }}
        onSubmit={(values) => {
          console.log(values);
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

            {/* <AppFormField
              placeholder={"Account Type"}
              name={"accountType"}
              editable={false}
              value={values.accountType}
            /> */}

            <AppButtonBg text={"Register Now"} onPress={handleSubmit} />
          </View>
        )}
      </Formik>

      <View style={styles.bottomText}>
        <Text style={styles.text}>Already have an account? </Text>
        <Pressable style={{ justifyContent: "center" }}>
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

export default AgentSignUp;
