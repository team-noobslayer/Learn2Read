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

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Record: RecordScreen,
    Profile: ProfileScreen,
    Quiz: QuizScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
