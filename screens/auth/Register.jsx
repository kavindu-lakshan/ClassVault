import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const registerUser = async (email, password, firstname, lastname) => {
    setLoading(true);
    const type = "admin";
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://recipt-37348.firebaseapp.com",
          })
          .then(() => {
            alert("Verification email sent");
          })
          .catch((error) => {})
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({ firstname, lastname, email, type });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
      setLoading(false);
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 23 }}>
        Create a new account
      </Text>
      <View style={{ marginTop: 40 }}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(firstname) => setFirstname(firstname)}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            autoCorrect={false}
          />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(lastname) => setLastname(lastname)}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            autoCorrect={false}
          />
        </View>

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
        onPress={() => registerUser(email, password, firstname, lastname)}
        style={styles.button}
      >
       {
          loading ? <ActivityIndicator size="large" color="#00ff00" /> : <Text style={{ fontWeight: "bold", fontSize: 22 }}>Register</Text>
        }
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },

  button: {
    marginTop: 30,
    height: 50,
    width: 250,
    backgroundColor: "#aaaaaa",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginBottom: 20,
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
