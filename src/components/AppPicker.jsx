import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReactNativeModal from "react-native-modal";
import { CheckBox } from "react-native-elements";

import colors from "../constants/Colors";

const AppPicker = ({ onValueChange, placeholder, options, value }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (option) => {
    onValueChange(option.value);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.inner}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.placeholder}>
            {selectedOption ? selectedOption.label : placeholder}
          </Text>

          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            style={{ opacity: 0.5 }}
          />
        </TouchableOpacity>
      </View>
      <ReactNativeModal
        isVisible={modalVisible}
        style={styles.modal}
        swipeThreshold={60}
        swipeDirection={"down"}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.line}></View>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <Pressable
                style={styles.item}
                onPress={() => {
                  handleSelect(item);
                }}
              >
                <Text style={styles.modalText}>{item.label}</Text>
                <CheckBox
                  checked={
                    selectedOption && selectedOption.value === item.value
                  }
                  onPress={() => handleSelect(item)}
                />
              </Pressable>
            )}
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: 8,
    paddingHorizontal: 15,
    height: 55,
  },
  inner: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  item: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  line: {
    alignSelf: "center",
    backgroundColor: colors.black,
    borderRadius: 3,
    opacity: 0.4,
    height: 5,
    width: 50,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 200,
    padding: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "500",
  },
  placeholder: {
    fontSize: 18,
    fontWeight: "500",
    opacity: 0.5,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default AppPicker;
