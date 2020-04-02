import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "./screens/LoadingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddJobScreen from "./screens/AddJobScreen";

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

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" size={24} color={tintColor} />
        )
      }
    },
    "Add Job": {
      screen: AddJobScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-add-circle" size={24} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#5271FF",
      inactiveTintColor: "#B8BBC4",
      showLabel: false
    }
  }
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);
