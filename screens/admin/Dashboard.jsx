import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

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

const Checker = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.lottieCOntainer}>
        <LottieView
          source={require("../../assets/onlineteaching.json")}
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
          Please click the button below to navigate to the Notices section.
        </Text>
        <MyButton
          title="Notices"
          onPress={() => navigation.navigate("Notices")}
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

export default Checker;
