import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AdminDashboard from '../screens/admin/Dashboard'
import Login from '../screens/auth/login'

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="admin-home"
                component={AdminDashboard}
            />

        </Stack.Navigator>


    );
}
