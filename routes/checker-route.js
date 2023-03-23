import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//Checker Routes
import CheckerDashboard from "../layouts/Checker-Side-Nav";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="checker-home" component={CheckerDashboard} />
    </Stack.Navigator>
  );
}
