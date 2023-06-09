import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { firebase } from "./config";

import AuhRoutes from "./routes/auth_routes";
import Routes from "./routes/route";
import CheckerRoutes from "./routes/checker-route";
import TeacherRoutes from "./routes/teacher-route";

import { Dimensions } from "react-native";
import Splash from "./components/Splash";

const { width, height } = Dimensions.get("window");

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [loggeduser, setloggedUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (isLoading) {
    return <Splash setIsLoading={setIsLoading} />;
  } else {
    if (firebase.auth().currentUser) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((user) => {
          console.log(user);
          setloggedUser(user.data().type);
        })
        .catch((error) => {
          setloggedUser(null);
        });

      if (loggeduser == "admin") {
        return <Routes />;
      } else if (loggeduser == "checker") {
        return <CheckerRoutes />;
      } else if (loggeduser == "teacher") {
        return <TeacherRoutes />;
      } else if (loggeduser == "student") {
        return <StudentRoutes />;
      }
    }

    if (!firebase.auth().currentUser) {
      return <AuhRoutes />;
    }
  }
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
