import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SideNav from './layouts/Side-Nav'

export default function App() {
    return (
        <NavigationContainer>
            <SideNav/>
        </NavigationContainer>
    );
}
