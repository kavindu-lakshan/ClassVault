import React from 'react';
import {Entypo, Feather, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import DrawerItems from "../constants/DrawerItem";
import {createDrawerNavigator} from "@react-navigation/drawer";

import ProfileScreen from "../screens/Profile";
import SettingsScreen from "../screens/Settings";
import SavedScreen from "../screens/Saved";
import ReferScreen from "../screens/Refer";
import AdminDashboard from '../screens/admin/Dashboard'
import Users from '../screens/admin/Users/Index'

export default function Header({screen}){
    const Drawer = createDrawerNavigator();
    return(
        <Drawer.Navigator
            drawerType="front"
            initialRouteName="Dashboard"
            screenOptions={{
                activeTintColor: '#e91e63',
                itemStyle: { marginVertical: 10 },
            }}

        >
            {
                DrawerItems.map(drawer=><Drawer.Screen
                    key={drawer.name}
                    name={drawer.name}
                    options={{
                        drawerIcon:({focused})=>
                            drawer.iconType==='Material' ?
                                <MaterialCommunityIcons
                                    name={drawer.iconName}
                                    size={24}
                                    color={focused ? "#e91e63" : "black"}
                                />
                                :
                                drawer.iconType==='Feather' ?
                                    <Feather
                                        name={drawer.iconName}
                                        size={24}
                                        color={focused ? "#e91e63" : "black"}
                                    />
                                    :
                                    <FontAwesome5
                                        name={drawer.iconName}
                                        size={24}
                                        color={focused ? "#e91e63" : "black"}
                                    />
                        ,
                        headerShown:true,
                    }}
                    component={
                        drawer.name==='Dashboard' ? AdminDashboard
                            : drawer.name==='Users' ? Users
                                : drawer.name==='Saved Items' ? SavedScreen
                                    : ReferScreen
                    }
                />)
            }
        </Drawer.Navigator>
    )
}
