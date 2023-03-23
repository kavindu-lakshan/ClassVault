import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../config";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Notice = () => {
  const [notice, setNotice] = useState([]);
  const noticeRef = firebase.firestore().collection("notice");
  const [addTopic, setAddTopic] = useState("");
  const [addDesc, setAddDesc] = useState("");
  const navigation = useNavigation();

  //fetch or read data from database
  useEffect(() => {
    noticeRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const notice = [];
      querySnapshot.forEach((doc) => {
        const { topic, description } = doc.data();
        notice.push({
          id: doc.id,
          topic,
          description,
        });
      });
      setNotice(notice);
    });
  }, []);

  //delete data from database
  const deleteNotice = (notice) => {
    noticeRef
      .doc(notice.id)
      .delete()
      .then(() => {
        alert("Successfully Deleted..!!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  //add data
  const addNotice = () => {
    if (addTopic && addDesc && addTopic.length > 0 && addDesc.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        topic: addTopic,
        description: addDesc,
        createdAt: timestamp,
      };
      noticeRef
        .add(data)
        .then(() => {
          setAddTopic("");
          setAddDesc("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.heading}>Add a Notice</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Topic"
            placeholderTextColor="#aaaaaa"
            onChangeText={(topic) => setAddTopic(topic)}
            value={addTopic}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#aaaaaa"
            onChangeText={(description) => setAddDesc(description)}
            value={addDesc}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.addButton} onPress={addNotice}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={notice}
          numColumns={1}
          renderItem={({ item }) => (
            <View>
              <Pressable
                style={styles.container}
                onPress={() => navigation.navigate("noticeUpdate", { item })}
              >
                <FontAwesome
                  name="trash-o"
                  color="red"
                  onPress={() => deleteNotice(item)}
                  style={styles.noticeIcon}
                />

                <View style={styles.innerContainer}>
                  <Text style={styles.itemTopic}>
                    {item.topic[0].toUpperCase() + item.topic.slice(1)}
                  </Text>
                  <Text style={styles.itemDescription}>
                    {item.description[0].toUpperCase() +
                      item.description.slice(1)}
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 45,
  },

  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 30,
  },

  itemHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 22,
  },

  formContainer: {
    flexDirection: "row",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
  },

  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
  },
  noticeIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
  addButton: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    marginTop: 20,
    height: 50,
    width: 150,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
