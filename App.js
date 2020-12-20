import React from "react";
import { StyleSheet, View } from 'react-native';
import {
  createAppContainer,
  // createSwitchNavigator
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import {createTabNavigator} from 'react-navigation-tabs';

import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RecordScreen from "./src/screens/RecordScreen";
import QuizScreen from "./src/screens/QuizScreen";
<<<<<<< HEAD
import Colors from './src/constants/colors';
=======
import DebugScreen from "./src/screens/DebugScreen";
>>>>>>> c0db9f2... Add debug screen

import Header from './src/components/Header';
import { Provider as QuizProvider } from "./src/context/quizContext";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Record: RecordScreen,
    Profile: ProfileScreen,
<<<<<<< HEAD
    Quiz: QuizScreen
=======
    Quiz: QuizScreen,
    Debug: DebugScreen,
>>>>>>> c0db9f2... Add debug screen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerTitle: "Learn2Read",
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: 'white'     
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <QuizProvider>
      <App />
    </QuizProvider>
  );
};
