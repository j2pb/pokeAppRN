
import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Home from './screens/Home';
import Details from './screens/Details';

const App = createStackNavigator({
  Home: { screen: Home },
  Details: { screen: Details },
})

export default App;