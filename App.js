import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SideNav from './layouts/Side-Nav'
import Users from './screens/admin/Users/Users'
export default function App() {
    return (
        <NavigationContainer>
            <Users/>
        </NavigationContainer>
    );
}
