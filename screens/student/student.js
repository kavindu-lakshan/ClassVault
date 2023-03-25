import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
  
  import { useNavigation } from "@react-navigation/native";
  import React from "react";
  import LottieView from "lottie-react-native";

  
  const MyButton = ({ onPress, title }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: "#2196F3",
          borderRadius: 40,
          width: 200,
          height: 75,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: "white",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const Student = () => {
    const navigation = useNavigation();
    return (
      <View>
        <View style={styles.lottieCOntainer}>
          <LottieView
            source={require("../../assets/teach.json")}
            autoPlay
            loop
            resizeMode="contain"
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 20,
            }}
          >
            Welcome...!
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "400",
              textAlign: "center",
              paddingTop: 20,
              paddingBottom: 30,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            Please click the button below to navigate to the Tickets section.
          </Text>
          <MyButton
            title="Tickets"
            onPress={() => navigation.navigate("Tickets")}
          />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    lottieCOntainer: {
      width: 250,
      height: 400,
      alignSelf: "center",
    },
  });

  export default Student;
  