import * as React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Users from "./Users";
import ReferScreen from "../../Refer";

const Tab = createMaterialTopTabNavigator();

export default function Index() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Profile" component={Users}/>
            <Tab.Screen name="Refer" component={ReferScreen}/>
        </Tab.Navigator>
    );
}
