import {
  createAppContainer
  // createSwitchNavigator
} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
// import {createTabNavigator} from 'react-navigation-tabs';

import HomeScreen from './src/screens/HomeScreen'
import RecordScreen from './src/screens/RecordScreen'
import QuizScreen from './src/screens/QuizScreen'

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Record: RecordScreen,
    Quiz: QuizScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'App'
    }
  }
)

export default createAppContainer(navigator)
