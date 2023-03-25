import React from "react";
import {
  Entypo,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DrawerItems from "../constants/DrawerItem";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { firebase } from "../config";

import ReferScreen from "../screens/RefreshScreen";
import Dashboard from "../screens/admin/Dashboard";
import Users from "../screens/admin/Users/Users";
import { useNavigation } from "@react-navigation/native";

export default function Header({ screen }) {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
      navigation.navigate("login");
    }
    navigation.navigate("login");
  };
  return (
    <Drawer.Navigator
      drawerType="front"
      initialRouteName="AdminDashboard"
      screenOptions={{
        activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 10 },
      }}
    >
      {DrawerItems.map((drawer) => (
        <Drawer.Screen
          key={drawer.name}
          name={drawer.name}
          options={{
            drawerIcon: ({ focused }) =>
              drawer.iconType === "Material" ? (
                <MaterialCommunityIcons
                  name={drawer.iconName}
                  size={24}
                  color={focused ? "#e91e63" : "black"}
                />
              ) : drawer.iconType === "Feather" ? (
                <Feather
                  name={drawer.iconName}
                  size={24}
                  color={focused ? "#e91e63" : "black"}
                />
              ) : (
                <FontAwesome5
                  name={drawer.iconName}
                  size={24}
                  color={focused ? "#e91e63" : "black"}
                />
              ),
            headerShown: true,
          }}
          component={
            drawer.name === "AdminDashboard"
              ? Dashboard
              : drawer.name === "Users"
              ? Users
              : drawer.name === "Logout"
              ? logout
              : Dashboard
          }
        />
      ))}
    </Drawer.Navigator>
  );
}
