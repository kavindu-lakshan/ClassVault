import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {firebase} from "../../config";


const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const redirectToPage = () => {
        firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((data) => {
                if (data.data().type === 'admin')
                    navigation.navigate("admin-home");
                else if (data.data().type === 'student')
                    console.log('add route')
                else if (data.data().type === 'checker')
                    console.log('add route')
                else if (data.data().type === 'teacher')
                    console.log('add route')
            });

    }

    const loginUser = async (email, password) => {
        try {
            let user = await firebase.auth().signInWithEmailAndPassword(email, password);
            redirectToPage()
        } catch (error) {
        }
    };


    return (
        <View style={styles.container}>
            <Text style={{fontWeight: "bold", fontSize: 26}}>Login to your account</Text>
            <View style={{marginTop: 40}}>
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

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        placeholder="Password"
                        onChangeText={(password) => setPassword(password)}
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />

                </View>
            </View>
            <TouchableOpacity
                onPress={() => loginUser(email, password)}
                style={styles.button}
            >
                <Text style={{fontWeight: "bold", fontSize: 22}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("register")}
                style={{marginTop: 20}}
            >
                <Text style={{fontWeight: "bold", fontSize: 16}}>
                    Don't have an account? Register
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 100,
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 400,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        marginBottom: 10,
        textAlign: "center",
    },
    button: {
        marginTop: 30,
        height: 50,
        width: 250,
        backgroundColor: "#aaaaaa",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        marginBottom: 20
    },
    formContainer: {
        flexDirection: "row",
        width: "80%",
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
});
