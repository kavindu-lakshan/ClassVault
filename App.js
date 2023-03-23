import React, {useEffect, useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {firebase} from "./config";

import AuhRoutes from './routes/auth_routes'
import Routes from './routes/route'


function App() {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        return firebase.auth().onAuthStateChanged(onAuthStateChanged);
    }, []);

    if (!user) {
        return (<AuhRoutes/>)
    } else {
        return (<Routes/>)
    }


}

export default () => {
    return (<NavigationContainer>
            <App/>
        </NavigationContainer>);
}
