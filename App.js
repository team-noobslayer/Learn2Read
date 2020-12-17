import {
  createAppContainer,
  // createSwitchNavigator
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import {createTabNavigator} from 'react-navigation-tabs';

import HomeScreen from "./src/screens/HomeScreen";

const navigator = createStackNavigator(
  { Home: HomeScreen },
  { initialRouteName: "Home" }
);

export default createAppContainer(navigator);
