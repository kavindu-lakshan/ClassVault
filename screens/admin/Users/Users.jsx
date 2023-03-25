import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SectionList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { Dialog } from "@rneui/themed";
import { firebase } from "../../../config";

import { Ionicons } from '@expo/vector-icons';

export default function Users() {
  const [viewUserDialogVisible, setViewUserDialogVisible] = useState(false);
  const [addUserDialogVisible, setAddUserDialogVisible] = useState(false);

  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilter] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [selectType, setSelectType] = useState("");
  const [selectEmail, setSelectEmail] = useState("");
  const [selectFirstName, setSelectFirstName] = useState("");
  const [selectLastName, setSelectLastName] = useState("");

  const [isTextDisabled, setIsTextDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const userRef = firebase.firestore().collection("users");

  useEffect(() => {
    allUsers()
  }, []);

  useEffect(() => {
    const filterUser = () => {
      let data = users.filter((item) => {
        return (
          item.firstname.toLowerCase().includes(search.toLowerCase()) ||
          item.lastname.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())
        );
      });
      let uniqueObjArray = [
        ...new Map(data.map((item) => [item["email"], item])).values(),
      ];
      setFilter(uniqueObjArray);
      setIsLoading(false);
    };
    filterUser();
  }, [search, users]);



  const viewUserDialogOpen = (item) => {
    setSelectedUser(item);
    setSelectEmail(item.email);
    setSelectFirstName(item.firstname);
    setSelectType(item.type);
    setSelectLastName(item.lastname);
    setViewUserDialogVisible(!viewUserDialogVisible);
  };
  const addNewUserDialogOpen = () => {
    setAddUserDialogVisible(!addUserDialogVisible);
  };

  const closeViewDialog = () => {
    setIsTextDisabled(!isTextDisabled);
    setViewUserDialogVisible(!viewUserDialogVisible);
  };
  const closeAddDialog = () => {
    setAddUserDialogVisible(!addUserDialogVisible);
  };

  const enableEditableText = () => {
    setIsTextDisabled(!isTextDisabled);
  };

  const refreshPage = async () => {
    await allUsers();
    await filterUser();
  };

  const allUsers = async () => {
    try {
      const user = [];
      setIsLoading(true);
      let result = await firebase
        .firestore()
        .collection("users")
        .get().then((snapshot) => {
          snapshot.forEach((doc) => {
            const { firstname, lastname, email, type } = doc.data();
            user.push({
              id: doc.id,
              firstname,
              lastname,
              email,
              type,
            });
            setUsers(user);
          });
        })
      console.log(result)
    } catch (e) { }
  }

  const filterUser = () => {
    let data = users.filter((item) => {
      return (
        item.firstname.toLowerCase().includes(search.toLowerCase()) ||
        item.lastname.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    let uniqueObjArray = [
      ...new Map(data.map((item) => [item["email"], item])).values(),
    ];
    setFilter(uniqueObjArray);
    setIsLoading(false);
  };

  const addUsers = async () => {
    try {
      if (!firstname || !lastname || !email || !type) {
        alert("Please fill all details")
      } else {
        const data = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          type: type,
        };
        let result = await firebase.firestore().collection("users").add(data)
        alert("Successfully Added..!!")
        refreshPage();
        closeAddDialog();

      }
    } catch (e) {
      alert("erre")
      console.log(e)
      closeAddDialog();
      refreshPage();
    }


  };

  const updateUser = async () => {
    try {
      setIsLoading(true);
      alert("update user")
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        firstname: selectFirstName,
        lastname: selectLastName,
        email: selectEmail,
        password: "11111111",
        type: selectType,
        timestamp: timestamp,
      };
      let result = await firebase
        .firestore()
        .collection("users")
        .doc(selectedUser.id)
        .update(data).then(() => {
          alert("Successfully Updated..!!")
          setViewUserDialogVisible(!viewUserDialogVisible);
          refreshPage();
        }).catch(() => {
          alert("error")
        })
    } catch (e) {
      alert(e)
    }
  };

  const confirmedDelete = async () => {
    setIsLoading(true);
    firebase
      .firestore()
      .collection("users")
      .doc(selectedUser.id)
      .delete()
      .then(() => {
        alert("Successfully Deleted..!!");
      })
      .catch((error) => {
        alert(error);
      });
    await refreshPage();
    closeViewDialog();


  }

  const deleteUser = async () => {
    Alert.alert('Confirm Deletion', 'Are you sure you want delete this user?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => confirmedDelete() },
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
          <View >
            <View style={styles.searchingBar}>
              <Searchbar
                placeholder="Search"
                onChangeText={(search) => {
                  setSearch(search);
                }}
              />
            </View>


          </View>

          <FlatList
            data={filterUsers}
            numColumns={1}
            renderItem={({ item }) => (
              <View style={styles.userDetailsCard}>
                <Image
                  source={require("../../../assets/download.jpg")}
                  style={styles.avatar}
                />
                <View style={styles.detailsContainer}>
                  <Text style={styles.name}>
                    Name : {item.firstname} {item.lastname}
                  </Text>
                  <Text style={styles.email}>Email: {item.email}</Text>
                </View>
                <TouchableOpacity
                  style={styles.viewMoreButton}
                  onPress={() => {
                    viewUserDialogOpen(item);
                  }}
                >
                  <Text style={styles.viewMoreButtonText}>View More</Text>
                </TouchableOpacity>
              </View>
            )}
          />

<View style={styles.container}>
              <TouchableOpacity style={styles.button} onPress={addNewUserDialogOpen} >
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>

          {/* View Single User */}
          <Dialog
            isVisible={viewUserDialogVisible}
            onBackdropPress={closeViewDialog}
          >
            <View>
              <Image
                source={require("../../../assets/download.jpg")}
                style={styles.avatarShow}
              />
              <Text style={styles.detailsTag}>First Name</Text>
              <View style={styles.formContainer}>

                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#aaaaaa"
                  value={selectFirstName}
                  onChangeText={(e) => {
                    setSelectFirstName(e);
                  }}
                  disabled={isTextDisabled}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
                />
              </View>
              <Text style={styles.detailsTag}>Last Name</Text>
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#aaaaaa"
                  value={selectLastName}
                  onChangeText={(e) => {
                    setSelectLastName(e);
                  }}
                  disabled={isTextDisabled}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
                />
              </View>
              <Text style={styles.detailsTag}>Email</Text>
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#aaaaaa"
                  value={selectEmail}
                  onChangeText={(e) => {
                    setSelectEmail(e);
                  }}
                  disabled={isTextDisabled}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
                />
              </View>
              <Text style={styles.detailsTag}>Type</Text>
              <Picker
                selectedValue={selectType}
                style={{ height: 30, width: 200 }}
                onValueChange={(itemValue) => setSelectType(itemValue)}
              >
                <Picker.Item label="none" value="Please select value" />
                <Picker.Item label="Teacher" value="teacher" />
                <Picker.Item label="Checker" value="checker" />
              </Picker>
              {isTextDisabled && (
                <View
                  style={{

                    flexDirection: "row",
                    justifyContent: "space-between",


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
                    onPress={deleteUser}
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
                    paddingHorizontal: 16
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
                    onPress={updateUser}
                  >
                    <Text style={styles.dialogButtonText}>Update</Text>
                  </TouchableOpacity>
                </View>
              )}
              
            </View>

          </Dialog>

          {/*add new user*/}
          <Dialog
            isVisible={addUserDialogVisible}
          // onBackdropPress={viewUserDialogOpen}
          >
            <View>
              <Image
                source={require("../../../assets/download.jpg")}
                style={styles.avatarShow}
              />

              <Text style={styles.detailsTag}>First Name</Text>
              <View style={styles.formContainer}>

                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(email) => setFirstname(email)}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
                />
              </View>
              <Text style={styles.detailsTag}>Last Name</Text>
              <View style={styles.formContainer}>

                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(email) => setLastname(email)}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
                />
              </View>

              <Text style={styles.detailsTag}>Email</Text>
              <View style={styles.formContainer}>

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(email) => setEmail(email)}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
                />
              </View>
              <Text style={styles.detailsTag}>Type</Text>
              <Picker
                selectedValue={type}
                style={{ height: 30, width: 200 }}
                onValueChange={(itemValue) => setType(itemValue)}
              >
                <Picker.Item label="none" value="Please select value" />
                <Picker.Item label="Teacher" value="teacher" />
                <Picker.Item label="Checker" value="checker" />
              </Picker>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                  paddingTop: 5
                }}
              >
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={(e) => { closeAddDialog() }}
                >
                  <Text style={styles.dialogButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={(e) => { addUsers() }}
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
  name: {
    fontWeight: "bold",
  },
  email: {
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
    marginTop: 10,
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
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  formContainer: {
    flexDirection: "row",
    width: "80%",
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 350,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
});
