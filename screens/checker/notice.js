import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Animated,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { Dialog } from "@rneui/themed";
import { firebase } from "../../config";
import * as Animatable from "react-native-animatable";
// import AppLoader from "../../components/AppLoader";
// import { confirm } from "react-confirm-box";
import { Ionicons } from "@expo/vector-icons";
export default function Notice() {
  const [viewNoticeDialogVisible, setViewNoticeDialogVisible] = useState(false);
  const [addNoticeDialogVisible, setAddNoticeDialogVisible] = useState(false);

  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState([]);
  const [filterNotices, setFilter] = useState([]);

  const [addTopic, setAddTopic] = useState("");
  const [addDesc, setAddDesc] = useState("");

  const [selectedNotice, setSelectedNotice] = useState({});
  const [selectTopic, setSelectTopic] = useState("");
  const [selectDesc, setSelectDesc] = useState("");

  const [isTextDisabled, setIsTextDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const allNotices = async () => {
      try {
        const notic = [];
        await firebase
          .firestore()
          .collection("notice")
          .onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
              const { topic, description } = doc.data();
              notic.push({
                id: doc.id,
                topic,
                description,
              });
              setNotice(notic);
            });
          });
      } catch (e) {}
    };

    allNotices();
  }, []);

  useEffect(() => {
    const filterNotice = () => {
      let data = notice.filter((item) => {
        return (
          item.topic.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
        );
      });
      let uniqueObjArray = [
        ...new Map(data.map((item) => [item["topic"], item])).values(),
      ];
      setFilter(uniqueObjArray);
      setIsLoading(false);
    };
    filterNotice();
  }, [search, notice]);

  const filterNotice = () => {
    let data = notice.filter((item) => {
      return (
        item.topic.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
    });
    let uniqueObjArray = [
      ...new Map(data.map((item) => [item["topic"], item])).values(),
    ];
    setFilter(uniqueObjArray);
    setIsLoading(false);
  };

  const viewNoticeDialogOpen = (item) => {
    setSelectedNotice(item);
    setSelectTopic(item.topic);
    setSelectDesc(item.description);
    setViewNoticeDialogVisible(!viewNoticeDialogVisible);
  };

  const addNewNoticeDialogOpen = () => {
    setAddNoticeDialogVisible(!addNoticeDialogVisible);
  };

  const closeViewDialog = () => {
    setIsTextDisabled(!isTextDisabled);
    setViewNoticeDialogVisible(!viewNoticeDialogVisible);
  };
  const closeAddDialog = () => {
    setAddNoticeDialogVisible(!addNoticeDialogVisible);
  };

  const enableEditableText = () => {
    setIsTextDisabled(!isTextDisabled);
  };

  const refreshPage = async () => {
    await allNotices();
    filterNotice();
  };

  const allNotices = async () => {
    try {
      const notice = [];
      firebase
        .firestore()
        .collection("notice")
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            const { topic, description } = doc.data();
            notice.push({
              id: doc.id,
              topic,
              description,
            });
            setNotice(notice);
          });
        });
    } catch (e) {}
  };

  //add data
  const addNotice = async () => {
    try {
      setIsLoading(true);
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        topic: addTopic,
        description: addDesc,
        createdAt: timestamp,
      };

      await firebase.firestore().collection("notice").add(data);

      addNewNoticeDialogOpen();
      await refreshPage();
    } catch (e) {}
  };

  const updateNotice = async () => {
    try {
      setIsLoading(true);
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        topic: selectTopic,
        description: selectDesc,
        timestamp: timestamp,
      };
      const result = await firebase
        .firestore()
        .collection("notice")
        .doc(selectedNotice.id)
        .update(data);
      await refreshPage();
      setViewNoticeDialogVisible(false);
    } catch (e) {}
  };

  //delete data from database
  const confirmedDelete = async () => {
    setIsLoading(true);
    firebase
      .firestore()
      .collection("notice")
      .doc(selectedNotice.id)
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

  const deleteNotice = async () => {
    Alert.alert("Confirm deletion", "Are you sure you want to delete this?", [
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
        <View style={{ flex: 5, marginTop: "10%" }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View>
          <View>
            <View style={{ marginTop: 20, marginHorizontal: 20 }}>
              <Searchbar
                placeholder="Search"
                onChangeText={(search) => {
                  setSearch(search);
                }}
              />
            </View>
          </View>

          <FlatList
            data={filterNotices}
            numColumns={1}
            renderItem={({ item, index }) => (
              <Animatable.View
                animation={"fadeInUp"}
                duration={1000}
                delay={index}
                style={styles.noticeDetailsCard}
              >
                <View style={styles.detailsContainer}>
                  <Text style={styles.topic}>{item.topic.toUpperCase()}</Text>
                  <Text style={styles.desc}>{item.description}</Text>
                </View>
                <TouchableOpacity
                  style={styles.viewMoreButton}
                  onPress={() => {
                    viewNoticeDialogOpen(item);
                  }}
                >
                  <Text style={styles.viewMoreButtonText}>View More</Text>
                </TouchableOpacity>
              </Animatable.View>
            )}
          />

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              onPress={addNewNoticeDialogOpen}
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/*View Single Notice*/}
          <Dialog
            isVisible={viewNoticeDialogVisible}
            onBackdropPress={viewNoticeDialogOpen}
          >
            <View>
              <Text style={styles.detailsTag}>Topic</Text>
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Topic"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(topic) => setSelectTopic(topic)}
                  value={selectTopic}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
                />
              </View>
              <Text style={styles.detailsTag}>Description</Text>
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Topic"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(description) => setSelectDesc(description)}
                  value={selectDesc}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
                />
              </View>
              {isTextDisabled && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
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
                    onPress={deleteNotice}
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
                    paddingHorizontal: 20,
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
                    onPress={updateNotice}
                  >
                    <Text style={styles.dialogButtonText}>Update</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Dialog>

          {/*add new notice*/}
          <Dialog
            isVisible={addNoticeDialogVisible}
            // onBackdropPress={viewUserDialogOpen}
          >
            <View>
              <Text style={styles.detailsTag}>Topic</Text>
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Topic"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(topic) => setAddTopic(topic)}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
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
                  paddingHorizontal: 20,
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
                  onPress={addNotice}
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
  noticeDetailsCard: {
    backgroundColor: "#f7f7f7",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  desc: {
    color: "#666",
  },
  viewMoreButton: {
    backgroundColor: "#ccc",
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
    backgroundColor: "blue",
    borderRadius: 8,
    padding: 10,
  },
  dialogButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 8,
    padding: 10,
  },
  searchingBar: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  addBtn: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
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
  floatingContainer: {
    position: "absolute",
    bottom: 0,
    right: 20,
  },
  floatingButton: {
    backgroundColor: "blue",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 450,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
});
