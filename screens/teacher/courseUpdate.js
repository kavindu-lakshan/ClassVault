import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";

const courseUpdate = ({ route }) => {
  const courseRef = firebase.firestore().collection("course");
  const [textTopic, onChangeTopicText] = useState(route.params.item.name);
  const [textDesc, onChangeDescText] = useState(route.params.item.name);
  const [textNum, onChangeNumText] = useState(route.params.item.name);
  const navigation = useNavigation();

  const updateCourse = () => {
    if (textTopic && textDesc && textNum && textTopic.length > 0 && textDesc.length > 0 && textNum.length > 0) {
        courseRef
        .doc(route.params.item.id)
        .update({
          topic: textTopic,
          description: textDesc,
          num: textNum,
        })
        .then(() => {
          navigation.navigate("Course");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
      <TextInput
        style={styles.textField}
        onChangeText={onChangeTopicText}
        value={textTopic}
        placeholder="Update Topic"
      />
      <View style={styles.formContainer}>
      <TextInput
        style={styles.textField}
        onChangeText={onChangeDescText}
        value={textNum}
        placeholder="Update Module Code"
      />
</View>
      </View>
      <View style={styles.formContainer}>
      <TextInput
        style={styles.textField}
        onChangeText={onChangeDescText}
        value={textDesc}
        placeholder="Update Description"
      />
</View>
      <Pressable
        style={styles.buttonUpdate}
        onPress={() => {
          updateCourse();
        }}
      >
        <Text>Update Course</Text>
      </Pressable>
    </View>
  );
};

export default courseUpdate;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15,
  },

  textField: {
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    color: "#000000",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },

  buttonUpdate: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: "#0de065",
  },
  formContainer: {
    flexDirection: "row",
    width: "80%",
    height: 40,
  },
});
