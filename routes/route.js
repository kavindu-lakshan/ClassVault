import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//Checker Routes
import AdminDashboard from "../layouts/Side-Nav";
<<<<<<< HEAD
import Notices from "../screens/admin/Users/Users";
import Course from "../screens/teacher/course";
=======
import Users from "../screens/admin/Users/Users";
>>>>>>> a9923d0d762f3a9b46ee88e4b23f136ac3f4a3ed

// import AdminDashboard from "../layouts/Checker-Side-Nav";
import TeacherDashboard from "../layouts/Teacher-Side-Nav";

//Teacher Routes
import TeacherDashboard from "../layouts/Teacher-Side-Nav";
import Course from "../screens/teacher/course";
import courseUpdate from "../screens/teacher/course";

const Stack = createStackNavigator();



export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="admin-home" component={AdminDashboard} />
      <Stack.Screen name="teacher-home" component={TeacherDashboard} />
    </Stack.Navigator>
  );
}
