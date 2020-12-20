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
import Colors from './src/constants/colors';

import Header from './src/components/Header';
import { Provider as QuizProvider } from "./src/context/quizContext";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Record: RecordScreen,
    Profile: ProfileScreen,
    Quiz: QuizScreen
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
