import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdminDashboard from "../layouts/Side-Nav";
import Login from "../screens/auth/login";

//Checker Routes
import CheckerDashboard from "../layouts/Checker-Side-Nav";
import Notice from "../screens/checker/notice";
import noticeUpdate from "../screens/checker/notice";

//Teacher Routes
import TeacherDashboard from "../layouts/Teacher-Side-Nav";
import Course from "../screens/teacher/course";
import courseUpdate from "../screens/teacher/course";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="admin-home" component={AdminDashboard} />

      {/* checker routes */}
      <Stack.Screen name="checker-home" component={CheckerDashboard} />

      {/* teacher routes */}
      <Stack.Screen name="teacher-home" component={TeacherDashboard} />
    </Stack.Navigator>
  );
}
