import React, { FC, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
import AppStack from "./appstack";
import AuthStack from "./authstack";

const MainNav: FC = () => {
  const [user, setUser] = useState<any>(null);

  const checkAuth = () => {
    firebase.auth().onAuthStateChanged((_user) => {
      if (_user) {
        setUser(user);
      }
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      {user !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNav;
