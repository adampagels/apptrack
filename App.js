import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  createStackNavigation,
  createStackNavigator
} from "react-navigation-stack";
import LoadingScreen from "./screens/LoadingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD8L8vYBLk0TpLnN-aAC9gS1-m3TmAIuf0",
  authDomain: "apptrack-a3d34.firebaseapp.com",
  databaseURL: "https://apptrack-a3d34.firebaseio.com",
  projectId: "apptrack-a3d34",
  storageBucket: "apptrack-a3d34.appspot.com",
  messagingSenderId: "230145792266",
  appId: "1:230145792266:web:96cdf7f808ba8f908982f3",
  measurementId: "G-DR8GT8LG1B"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppStack = createStackNavigator({
  Home: HomeScreen
});

const AuthStack = createStackNavigator({
  Register: RegisterScreen,
  Login: LoginScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      Auth: AuthStack,
      App: AppStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);
