import React from "react";
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
import DebugScreen from "./src/screens/DebugScreen";

import { Provider as QuizProvider } from "./src/context/quizContext";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Record: RecordScreen,
    Profile: ProfileScreen,
    Quiz: QuizScreen,
    Debug: DebugScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
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
