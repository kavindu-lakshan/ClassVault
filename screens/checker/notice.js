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
} from "react-native";
import React, { useEffect, useState } from "react";
// import { Searchbar } from "react-native-paper";
// import { Dialog } from "@rneui/themed";
import { firebase } from "../../config";
// import { confirm } from "react-confirm-box";

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

  useEffect(async () => {
    await allNotices();
  }, []);

  useEffect(() => {
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
  const deleteNotice = async () => {
    const options = {
      labels: {
        confirmable: "Confirm",
        cancellable: "Cancel",
      },
    };

    // const result = await confirm("", options);
    // if (result) {
    //   setIsLoading(true);
    //   firebase
    //     .firestore()
    //     .collection("notice")
    //     .doc(selectedNotice.id)
    //     .delete()
    //     .then(() => {
    //       alert("Successfully Deleted..!!");
    //     })
    //     .catch((error) => {
    //       alert(error);
    //     });
    //   await refreshPage();
    //   closeViewDialog();
    // }
    // console.log("You click No!");
  };

  return (
    <View>
      {isLoading ? (
        <View style={{ flex: 5, marginTop: "10%" }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.searchingBar}>
            <View style={styles.view}>
              {/* <Searchbar
                placeholder="Search"
                onChangeText={(search) => {
                  setSearch(search);
                }}
              /> */}
            </View>
            <View style={styles.view}>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={addNewNoticeDialogOpen}
              >
                <Text style={styles.viewMoreButtonText}>ADD</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView>
            <FlatList
              data={filterNotices}
              numColumns={1}
              renderItem={({ item }) => (
                <View style={styles.userDetailsCard}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.topic}>
                      {item.topic.toUpperCase() + item.topic.slice(1)}
                    </Text>
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
                </View>
              )}
            />
          </ScrollView>

          {/*View Single Notice*/}
          {/* <Dialog
            isVisible={viewNoticeDialogVisible}
            onBackdropPress={viewNoticeDialogOpen}
          >
            <View>
              <Text style={styles.detailsTag}>Topic</Text>
              <TextInput
                style={styles.input}
                placeholder="Topic"
                disabled={isTextDisabled}
                autoCorrect={false}
                placeholderTextColor="#aaaaaa"
                onChangeText={(topic) => setSelectTopic(topic)}
                value={selectTopic}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              <Text style={styles.detailsTag}>Description</Text>
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
              {isTextDisabled && (
                <View
                  style={{
                    flex: 1,
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
                    onPress={deleteNotice}
                  >
                    <Text style={styles.dialogButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
              {!isTextDisabled && (
                <View
                  style={{
                    flex: 1,
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
                    onPress={updateNotice}
                  >
                    <Text style={styles.dialogButtonText}>Update</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Dialog> */}

          {/*add new notice*/}
          {/* <Dialog
            isVisible={addNoticeDialogVisible}
            // onBackdropPress={viewUserDialogOpen}
          >
            <View>
              <Text style={styles.detailsTag}>Topic</Text>
              <TextInput
                style={styles.input}
                placeholder="Topic"
                placeholderTextColor="#aaaaaa"
                onChangeText={(topic) => setAddTopic(topic)}
                value={addTopic}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              <Text style={styles.detailsTag}>Description</Text>
              <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="#aaaaaa"
                onChangeText={(description) => setAddDesc(description)}
                value={addDesc}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              <View
                style={{
                  flex: 1,
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
                  onPress={addNotice}
                >
                  <Text style={styles.dialogButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Dialog> */}
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
    borderRadius: 10,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingTop: 0,
    borderRadius: 8,
  },
  dialogButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingTop: 0,
    borderRadius: 8,
  },
  searchingBar: {
    marginTop: "10px",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  addBtn: {
    backgroundColor: "blue",
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
});
