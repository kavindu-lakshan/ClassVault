import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { Dialog } from "@rneui/themed";
import { firebase } from "../../config";

export default function Course() {
  const [viewCourseDialogVisible, setViewCourseDialogVisible] = useState(false);
  const [addCourseDialogVisible, setAddCourseDialogVisible] = useState(false);

  const [search, setSearch] = useState("");
  const [course, setCourse] = useState([]);
  const [filterCourses, setFilter] = useState([]);

  const [addTopic, setAddTopic] = useState("");
  const [addDesc, setAddDesc] = useState("");
  const [addNum, setAddNum] = useState("");

  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectTopic, setSelectTopic] = useState("");
  const [selectDesc, setSelectDesc] = useState("");
  const [selectNum, setSelectNum] = useState("");

  const [isTextDisabled, setIsTextDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    await allCourse();
  }, []);

  //search
  useEffect(() => {
    filterCourse();
  }, [search, course]);

  const filterCourse = () => {
    let data = course.filter((item) => {
      return (
        item.topic.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.num.toLowerCase().includes(search.toLowerCase())
      );
    });
    let uniqueObjArray = [
      ...new Map(data.map((item) => [item["topic"], item])).values(),
    ];
    setFilter(uniqueObjArray);
    setIsLoading(false);
  };

  const viewCourseDialogOpen = (item) => {
    setSelectedCourse(item);
    setSelectTopic(item.topic);
    setSelectDesc(item.description);
    setSelectNum(item.num);
    setViewCourseDialogVisible(!viewCourseDialogVisible);
  };

  const addNewCourseDialogOpen = () => {
    setAddCourseDialogVisible(!addCourseDialogVisible);
  };

  const closeViewDialog = () => {
    setIsTextDisabled(!isTextDisabled);
    setViewCourseDialogVisible(!viewCourseDialogVisible);
  };
  const closeAddDialog = () => {
    setAddCourseDialogVisible(!addCourseDialogVisible);
  };

  const enableEditableText = () => {
    setIsTextDisabled(!isTextDisabled);
  };

  const refreshPage = async () => {
    await allCourse();
    filterCourse();
  };

  const allCourse = async () => {
    try {
      const course = [];
      firebase
        .firestore()
        .collection("course")
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            const { topic, description, num } = doc.data();
            course.push({
              id: doc.id,
              topic,
              description,
              num,
            });
            setCourse(course);
          });
        });
    } catch (e) {}
  };

  //add course
  const addCourse = async () => {
    try {
      setIsLoading(true);
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        topic: addTopic,
        description: addDesc,
        num: addNum,
        createdAt: timestamp,
      };

      await firebase.firestore().collection("course").add(data);

      addNewCourseDialogOpen();
      await refreshPage();
    } catch (e) {}
  };

  //update course
  const updateCourse = async () => {
    try {
      setIsLoading(true);
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        topic: selectTopic,
        description: selectDesc,
        num: selectNum,
        timestamp: timestamp,
      };
      const result = await firebase
        .firestore()
        .collection("course")
        .doc(selectedCourse.id)
        .update(data);
      await refreshPage();
      setViewCourseDialogVisible(false);
    } catch (e) {}
  };

  //delete course from database
  // const deleteCourse = async () => {
  //   const options = {
  //     labels: {
  //       confirmable: "Confirm",
  //       cancellable: "Cancel",
  //     },
  //   };

  //   const result = await confirm("", options);
  //   if (result) {
  //     setIsLoading(true);
  //     firebase
  //       .firestore()
  //       .collection("course")
  //       .doc(selectedCourse.id)
  //       .delete()
  //       .then(() => {
  //         alert("Successfully Deleted..!!");
  //       })
  //       .catch((error) => {
  //         alert(error);
  //       });
  //     await refreshPage();
  //     closeViewDialog();
  //   }
  //   console.log("You click No!");
  // };

  const confirmedDelete = async () => {
    setIsLoading(true);
    firebase
      .firestore()
      .collection("course")
      .doc(selectedCourse.id)
      .delete()
      .then(() => {
        alert("Successfully Deleted..!!");
      })
      .catch((error) => {
        alert(error);
      });
    await refreshPage();
    closeViewDialog();
  };

  const deleteCourse = async () => {
    Alert.alert("Are you sure you want to delete", "???", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => confirmedDelete() },
    ]);

    console.log("You click No!");
  };

  return (
    <View>
      {isLoading ? (
        <View style={{marginTop: "10%" }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View>
          <View style={styles.searchingBar}>
            <View style={styles.view}>
              <Searchbar
                placeholder="Search"
                onChangeText={(search) => {
                  setSearch(search);
                }}
              />
            </View>
            <View style={styles.view}>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={addNewCourseDialogOpen}
              >
                <Text style={styles.viewMoreButtonText}>New</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView>
            <FlatList
              data={filterCourses}
              numColumns={1}
              renderItem={({ item }) => (
                <View style={styles.userDetailsCard}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.topic}>{item.topic}</Text>
                    {/* <Text style={styles.desc}>{item.description}</Text> */}
                  </View>
                  <TouchableOpacity
                    style={styles.viewMoreButton}
                    onPress={() => {
                      viewCourseDialogOpen(item);
                    }}
                  >
                    <Text style={styles.viewMoreButtonText}>View Course</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>

          {/*View Single course*/}
          <Dialog
            isVisible={viewCourseDialogVisible}
            onBackdropPress={viewCourseDialogOpen}
          >
            <View>
              {/* <Text style={styles.detailsTag}>Module</Text> */}
              <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Module"
                disabled={isTextDisabled}
                autoCorrect={false}
                placeholderTextColor="#aaaaaa"
                onChangeText={(topic) => setSelectTopic(topic)}
                value={selectTopic}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              </View>
              {/* <Text style={styles.detailsTag}>Module Code</Text> */}
              <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Module Code"
                disabled={isTextDisabled}
                autoCorrect={false}
                placeholderTextColor="#aaaaaa"
                onChangeText={(num) => setSelectNum(num)}
                value={selectNum}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              </View>
              {/* <Text style={styles.detailsTag}>Description</Text> */}
              <View style={styles.formContainer}>
              <TextInput
                disabled={isTextDisabled}
                autoCorrect={false}
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="#aaaaaa"
                onChangeText={(description) => setSelectDesc(description)}
                value={selectDesc}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              </View>
              {isTextDisabled && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 16,
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={enableEditableText}
                    hidden
                  >
                    <Text style={styles.dialogButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={deleteCourse}
                  >
                    <Text style={styles.dialogButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
              {!isTextDisabled && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 16,
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={closeViewDialog}
                  >
                    <Text style={styles.dialogButtonText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={updateCourse}
                  >
                    <Text style={styles.dialogButtonText}>Update</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Dialog>

          {/*add new course*/}
          <Dialog
            isVisible={addCourseDialogVisible}
            // onBackdropPress={viewUserDialogOpen}
          >
            <View>
              <Text style={styles.detailsTag}>Module</Text>
              <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Module"
                placeholderTextColor="#aaaaaa"
                onChangeText={(topic) => setAddTopic(topic)}
                value={addTopic}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              </View>
              <Text style={styles.detailsTag}>Module Code</Text>
              <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Module Code"
                placeholderTextColor="#aaaaaa"
                onChangeText={(num) => setAddNum(num)}
                value={addNum}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              </View>
              <Text style={styles.detailsTag}>Description</Text>
              <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="#aaaaaa"
                onChangeText={(description) => setAddDesc(description)}
                value={addDesc}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={closeAddDialog}
                >
                  <Text style={styles.dialogButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={addCourse}
                >
                  <Text style={styles.dialogButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Dialog>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  userDetailsCard: {
    backgroundColor: "#f7f7f7",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lottie: {
    width: 100,
    height: 100,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  topic: {
    fontWeight: "bold",
  },
  desc: {
    color: "#666",
  },
  viewMoreButton: {
    backgroundColor: "#EF92C2",
    padding: 10,
    borderRadius: 5,
  },
  viewMoreButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
    marginTop: 20,
  },
  detailsTag: {
    marginTop: 20,
    fontWeight: "bold",
  },
  avatarShow: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: "auto",
    marginRight: "auto",
  },
  editButton: {
    backgroundColor: "#091052",
    padding: 10,
    borderRadius: 8,
  },
  dialogButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#EF92C2",
    padding: 10,
    borderRadius: 8,
  },
  searchingBar: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  addBtn: {
    backgroundColor: "#091052",
    padding: 10,
    borderRadius: 5,
  },

  //----------------------------//
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
  formContainer: {
    flexDirection: "row",
    width: "80%",
    height: 40,
  },
});
