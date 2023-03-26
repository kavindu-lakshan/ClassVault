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
    Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { Dialog } from "@rneui/themed";
import { firebase } from "../../config";

export default function Ticket() {
    const [viewTicketDialogVisible, setViewTicketDialogVisible] = useState(false);
    const [addTicketDialogVisible, setAddTicketDialogVisible] = useState(false);

    const [search, setSearch] = useState("");
    const [ticket, setTicket] = useState([]);
    const [filterTickets, setFilter] = useState([]);

    const [addTopic, setAddTopic] = useState("");
    const [addDesc, setAddDesc] = useState("");
    const [addNum, setAddNum] = useState("");

    const [selectedTicket, setSelectedTicket] = useState({});
    const [selectTopic, setSelectTopic] = useState("");
    const [selectDesc, setSelectDesc] = useState("");
    const [selectNum, setSelectNum] = useState("");

    const [isTextDisabled, setIsTextDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        await allTicket();
    }, []);


    //search
    useEffect(() => {
        filterTicket();
    }, [search, ticket]);

    const filterTicket = () => {
        let data = ticket.filter((item) => {
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

    const viewTicketDialogOpen = (item) => {
        setSelectedTicket(item);
        setSelectTopic(item.topic);
        setSelectDesc(item.description);
        setSelectNum(item.num);
        setViewTicketDialogVisible(!viewTicketDialogVisible);
    };

    const addNewTicketDialogOpen = () => {
        setAddTicketDialogVisible(!addTicketDialogVisible);
    };

    const closeViewDialog = () => {
        setIsTextDisabled(!isTextDisabled);
        setViewTicketDialogVisible(!viewTicketDialogVisible);
    };
    const closeAddDialog = () => {
        setAddTicketDialogVisible(!addTicketDialogVisible);
    };

    const enableEditableText = () => {
        setIsTextDisabled(!isTextDisabled);
    };

    const refreshPage = async () => {
        await allTicket();
        filterTicket();
    };

    const allTicket = async () => {
        try {
            const ticket = [];
            firebase
                .firestore()
                .collection("ticket")
                .onSnapshot((snapshot) => {
                    snapshot.forEach((doc) => {
                        const { topic, description, num } = doc.data();
                        ticket.push({
                            id: doc.id,
                            topic,
                            description,
                            num,
                        });
                        setTicket(ticket);
                    });
                });
        } catch (e) { }
    };

    //add ticket
    const addTicket = async () => {
        try {
            setIsLoading(true);
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                topic: addTopic,
                description: addDesc,
                num: addNum,
                createdAt: timestamp,
            };

            await firebase.firestore().collection("ticket").add(data);

            addNewTicketDialogOpen();
            await refreshPage();
        } catch (e) { }
    };

    //update ticket
    const updateTicket = async () => {
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
                .collection("ticket")
                .doc(selectedTicket.id)
                .update(data);
            await refreshPage();
            setViewTicketDialogVisible(false);
        } catch (e) { }
    };

    //delete ticket from database
    const confirmedDelete = async () => {
        setIsLoading(true);
        firebase
            .firestore()
            .collection("ticket")
            .doc(selectedTicket.id)
            .delete()
            .then(() => {
                alert("Successfully Deleted!");
            })
            .catch((error) => {
                alert(error);
            });
        await refreshPage();
        closeViewDialog();


    }

    const deleteTicket = async () => {
        Alert.alert('Delete Confirmation', 'Are you sure you want to delete?', [
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
                        <View>
                            <Searchbar
                                placeholder="Search"
                                onChangeText={(search) => {
                                    setSearch(search);
                                }}
                            />
                        </View>
                        <View style={styles.floatingContainer}>
                            <TouchableOpacity
                                style={styles.floatingButton}
                                onPress={addNewTicketDialogOpen}
                            >
                                <Text style={styles.viewMoreButtonText}>ADD</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <FlatList
                        data={filterTickets}
                        numColumns={1}
                        renderItem={({ item }) => (
                            <View style={styles.userDetailsCard}>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.topic}>
                                        {item.topic}
                                    </Text>
                                    <Text style={styles.desc}>{item.description}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.viewMoreButton}
                                    onPress={() => {
                                        viewTicketDialogOpen(item);
                                    }}
                                >
                                    <Text style={styles.viewMoreButtonText}>View More</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                    {/*View Single Ticket*/}
                    <Dialog
                        isVisible={viewTicketDialogVisible}
                        onBackdropPress={viewTicketDialogOpen}
                    >
                        <View>
                            <Text style={styles.detailsTag}>Ticket Subject</Text>
                            <View style={styles.formContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ticket Subject"
                                    placeholderTextColor="#aaaaaa"
                                    onChangeText={(topic) => setSelectTopic(topic)}
                                    value={selectTopic}
                                    autoCapitalize="none"
                                    underlineColorAndroid="transparent"
                                    autoCorrect={false}
                                />
                            </View>
                            <Text style={styles.detailsTag}>Student Issue</Text>
                            <View style={styles.formContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Student Issue"
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
                                        paddingHorizontal: 16,

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
                                        onPress={deleteTicket}
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
                                        onPress={updateTicket}
                                    >
                                        <Text style={styles.dialogButtonText}>Update</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </Dialog>

                    {/*add new Ticket*/}
                    <Dialog
                        isVisible={addTicketDialogVisible}
                    // onBackdropPress={viewUserDialogOpen}
                    >
                        <View>
                            <Text style={styles.detailsTag}>Ticket Subject</Text>
                            <View style={styles.formContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ticket Subject"
                                    placeholderTextColor="#aaaaaa"
                                    onChangeText={(topic) => setAddTopic(topic)}
                                    autoCapitalize="none"
                                    underlineColorAndroid="transparent"
                                    autoCorrect={false}
                                />
                            </View>
                            <Text style={styles.detailsTag}>Student Issue</Text>
                            <View style={styles.formContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Student Issue"
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
                                    onPress={addTicket}
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
        position: 'absolute',
        bottom: 0,
        right: 20,
    },
    floatingButton: {
        backgroundColor: 'blue',
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
});
