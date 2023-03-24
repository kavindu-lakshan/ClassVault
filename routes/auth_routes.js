import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from '../screens/auth/login'
import Register from '../screens/auth/Register'

const Stack = createNativeStackNavigator();

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
