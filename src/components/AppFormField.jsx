import { Text, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import colors from "../constants/Colors";
import AppTextInput from "./AppTextInput";

const AppFormField = ({ name, ...props }) => {
  const { values, handleChange, errors, touched } = useFormikContext();
  return (
    <>
      <AppTextInput
        onChangeText={handleChange(name)}
        value={values[name]}
        {...props}
      />

      {touched[name] && errors[name] && (
        <Text style={styles.error}>{errors[name]}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: colors.error,
  },
});

export default AppFormField;
