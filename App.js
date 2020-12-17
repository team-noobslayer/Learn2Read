import React from "react";
import {
  createAppContainer,
  // createSwitchNavigator
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import {createTabNavigator} from 'react-navigation-tabs';

import HomeScreen from "./src/screens/HomeScreen";

import { Provider as QuizProvider } from "./src/context/quizContext";

const navigator = createStackNavigator(
  { Home: HomeScreen },
  { initialRouteName: "Home" }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <QuizProvider>
      <App />
    </QuizProvider>
  );
};
