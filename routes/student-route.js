import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Student Routes
import StudentDashboard from "../layouts/Student-Side-Nav";
import ticketUpdate from "../screens/student/ticketUpdate";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="student-home" component={StudentDashboard} />
      <Stack.Screen name="ticketUpdate" component={ticketUpdate} />
    </Stack.Navigator>
  );
}
