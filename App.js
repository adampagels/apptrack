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

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-home" size={24} color={tintColor} />
            )
          }
        },
        AddJob: {
          screen: AddJobScreen,
          navigationOptions: {
            tabBarIcon: ({}) => (
              <Ionicons
                name="ios-add-circle"
                size={50}
                color={"#5271FF"}
                style={{
                  shadowColor: "#E9446A",
                  shadowOffset: {
                    width: 0,
                    height: 0,
                    shadowRadius: 10,
                    shadowOpacity: 0.4
                  }
                }}
              />
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
        defaultNavigationOptions: {
          tabBarOnPress: ({ navigation, defaultHandler }) => {
            navigation.state.key === "AddJob"
              ? navigation.navigate("addjobModal")
              : defaultHandler();
          }
        },
        tabBarOptions: {
          activeTintColor: "#161F3D",
          inactiveTintColor: "#B8BBC4",
          showLabel: false
        }
      }
    ),
    addjobModal: {
      screen: AddJobScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none"
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
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);
