import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Checker Routes
import CheckerDashboard from "../layouts/Checker-Side-Nav";
import noticeUpdate from "../screens/checker/noticeUpdate";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="checker-home" component={CheckerDashboard} />
      <Stack.Screen name="noticeUpdate" component={noticeUpdate} />
    </Stack.Navigator>
  );
}
