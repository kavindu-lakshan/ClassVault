import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdminDashboard from "../layouts/Side-Nav";
import Login from "../screens/auth/login";

//Checker Routes
import CheckerDashboard from "../layouts/Checker-Side-Nav";
import Notice from "../screens/checker/notice";
import noticeUpdate from "../screens/checker/notice";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="admin-home" component={AdminDashboard} />

      {/* checker routes */}
      <Stack.Screen name="checker-home" component={CheckerDashboard} />
    </Stack.Navigator>
  );
}
