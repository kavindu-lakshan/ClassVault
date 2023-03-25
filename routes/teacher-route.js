import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//Teacher Routes
import TeacherDashboard from "../layouts/Teacher-Side-Nav";
import courseUpdate from "../screens/teacher/courseUpdate";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="teacher-home" component={TeacherDashboard} />
      <Stack.Screen name="courseUpdate" component={courseUpdate} />
    </Stack.Navigator>
  );
}
