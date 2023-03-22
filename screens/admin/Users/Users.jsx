import React, {useEffect, useState} from 'react';
import {FlatList, Image, Picker, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Searchbar} from 'react-native-paper';

import {Dialog} from '@rneui/themed';
import {firebase} from "../../../config";


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

    useEffect(() => {
        getCurrentUser()
    })

    useEffect(async () => {
        await allUsers()
    }, [])

    useEffect(() => {
        filterUser()
    }, [search, users])

    const filterUser = () => {
          let data =  users.filter(item => {
                return item.firstname.toLowerCase().includes(search.toLowerCase()) ||
                    item.lastname.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase())
            }
        )
        let uniqueObjArray = [...new Map(data.map((item) => [item["email"], item])).values()];
        setFilter(uniqueObjArray)

    }

    const allUsers = async () => {
        try {
            const user = [];
            firebase.firestore().collection("users").onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    const {firstname, lastname, email, type} = doc.data()
                    user.push({
                        id: doc.id,
                        firstname,
                        lastname,
                        email,
                        type
                    })
                    setUsers(user)
                })
            })
        } catch (e) {

        }
    }

    const getCurrentUser = () => {
        try {
            setCurrentUser(firebase.auth().currentUser.uid)
        } catch (e) {

        }

    }

    const addUsers = async () => {
        try {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: '11111111',
                type: type,
                timestamp: timestamp
            };
            await firebase
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then((e) => {
                    console.log(e)
                    firebase
                        .firestore()
                        .collection("users")
                        .doc(e.uid)
                        .set(data);

                })
                .catch((error) => {
                    alert(error.message);
                });
            addNewUserDialogOpen()
            await allUsers()
            filterUser()
        } catch (e) {

        }
    }

    const updateUser = async () => {
        try {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                firstname: selectFirstName,
                lastname: selectLastName,
                email: selectEmail,
                password: '11111111',
                type: selectType,
                timestamp: timestamp
            };
            const result = await firebase.firestore().collection("users").doc(selectedUser.id).update(data)
            await allUsers()
            filterUser()
            setViewUserDialogVisible(false)
        } catch (e) {

        }
    }

    const viewUserDialogOpen = (item) => {
        console.log(item)
        setSelectedUser(item)
        setSelectEmail(item.email)
        setSelectFirstName(item.firstname)
        setSelectType(item.type)
        setSelectLastName(item.lastname)
        setViewUserDialogVisible(!viewUserDialogVisible);
    };
    const addNewUserDialogOpen = () => {
        setAddUserDialogVisible(!addUserDialogVisible)
    };


    return (
        <View style={{flex: 1}}>
            <View style={styles.searchingBar}>
                <View style={styles.view}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={(search) => {
                            setSearch(search)
                        }}

                    />
                </View>
                <View style={styles.view}>
                    <TouchableOpacity style={styles.addBtn} onPress={addNewUserDialogOpen}>
                        <Text style={styles.viewMoreButtonText}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                <FlatList
                    data={filterUsers}
                    numColumns={1}
                    renderItem={({item}) => (
                        <View style={styles.userDetailsCard}>
                            <Image source={require('../../../assets/download.jpg')} style={styles.avatar}/>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.name}>Name : {item.firstname} {item.lastname}</Text>
                                <Text style={styles.email}>Email: {item.email}</Text>
                            </View>
                            <TouchableOpacity style={styles.viewMoreButton} onPress={() => {
                                viewUserDialogOpen(item)
                            }}>
                                <Text style={styles.viewMoreButtonText}>View More</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </ScrollView>


            {/*View Single User*/}
            <Dialog
                isVisible={viewUserDialogVisible}
                onBackdropPress={viewUserDialogOpen}
            >
                <View>
                    <Image source={require('../../../assets/download.jpg')} style={styles.avatarShow}/>
                    <Text style={styles.detailsTag}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        placeholder="Ishara Madusanka"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        value={selectFirstName}
                        onChangeText={(e) => {
                            setSelectFirstName(e)
                        }}
                    />
                    <Text style={styles.detailsTag}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        disabled
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        placeholder="Ishara Madusanka"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        value={selectLastName}
                        onChangeText={(e) => {
                            setSelectLastName(e)
                        }}
                    />
                    <Text style={styles.detailsTag}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        placeholder="Ishara@gmail.com"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        value={selectEmail}
                        onChangeText={(e) => {
                            setSelectEmail(e)
                        }}
                    />
                    <Text style={styles.detailsTag}>Type</Text>
                    <Picker
                        selectedValue={selectType}
                        style={{height: 30, width: 200}}
                        onValueChange={(itemValue) => setSelectType(itemValue)}
                    >
                        <Picker.Item label="none" value="Please select value"/>
                        <Picker.Item label="Teacher" value="teacher"/>
                        <Picker.Item label="Checker" value="checker"/>
                    </Picker>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                        marginTop: 20
                    }}>
                        <TouchableOpacity style={styles.editButton} onPress={updateUser}>
                            <Text style={styles.dialogButtonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Text style={styles.dialogButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog>


            {/*add new user*/}
            <Dialog
                isVisible={addUserDialogVisible}
                // onBackdropPress={viewUserDialogOpen}
            >
                <View>
                    <Image source={require('../../../assets/download.jpg')} style={styles.avatarShow}/>
                    <Text style={styles.detailsTag}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        placeholder="Enter First Name"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={(fName) => setFirstname(fName)}
                    />
                    <Text style={styles.detailsTag}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        placeholder="Enter Last Name"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={(lName) => setLastname(lName)}
                    />
                    <Text style={styles.detailsTag}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        placeholder="Enter Email"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={(email) => setEmail(email)}
                    />
                    <Text style={styles.detailsTag}>Type</Text>
                    {type}
                    <Picker
                        selectedValue={type}
                        style={{height: 30, width: 200}}
                        onValueChange={(itemValue) => setType(itemValue)}
                    >
                        <Picker.Item label="none" value="Please select value"/>
                        <Picker.Item label="Teacher" value="teacher"/>
                        <Picker.Item label="Checker" value="checker"/>
                    </Picker>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                        marginTop: 20
                    }}>
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.dialogButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton} onPress={addUsers}>
                            <Text style={styles.dialogButtonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog>
        </View>
    );
}

const styles = StyleSheet.create({
    userDetailsCard: {
        backgroundColor: '#f7f7f7',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        fontWeight: 'bold',
    },
    email: {
        color: '#666',
    },
    viewMoreButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    viewMoreButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: "hidden",
        backgroundColor: "white",
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
        marginTop: 20
    },
    detailsTag: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    avatarShow: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    editButton: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 16,
        paddingTop: 0,
        borderRadius: 8
    },
    dialogButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 16,
        paddingHorizontal: 16,
        paddingTop: 0,
        borderRadius: 8
    },
    searchingBar: {
        marginTop: '10px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },

    addBtn: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    }

});

