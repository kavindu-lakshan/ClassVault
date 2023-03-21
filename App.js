import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from './screens/auth/Login';
import Register from './screens/auth/register';

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
      <Register />
      <StatusBar style="auto" />
    </View>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});