import { View, Text } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import LottieView from "lottie-react-native";

interface SplashProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Splash = ({ setIsLoading }: SplashProps) => {
  return (
    <View style={{ flex: 1, alignItems: "center", margin: 0 }}>
      <LottieView
        source={require("../assets/splash.json")}
        autoPlay
        loop={false}
        resizeMode="cover"
        onAnimationFinish={() => setIsLoading(false)}
      />
    </View>
  );
};

export default Splash;
