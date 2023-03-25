import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Login from '../screens/auth/login'
import Register from '../screens/auth/Register'

const Stack = createStackNavigator();

export default function AuthRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="login"
                component={Login}
            />
            <Stack.Screen
                name="register"
                component={Register}
            />

        </Stack.Navigator>


    );
}
