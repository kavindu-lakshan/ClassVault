import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//Checker Routes
import AdminDashboard from "../layouts/Side-Nav";
import Notices from "../screens/admin/Users/Users";

// import AdminDashboard from "../layouts/Checker-Side-Nav";

//Student Routes

import StudentDashboard from "../layouts/Student-Side-Nav";
import ticketUpdate from "../screens/student/ticketUpdate";
import ticket from "../screens/student/ticket";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="admin-home" component={AdminDashboard} />

      <Stack.Screen name="student-home" component={StudentDashboard} />
    </Stack.Navigator>
  );
}
