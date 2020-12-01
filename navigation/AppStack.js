import * as React from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { StyleSheet, Image , View } from 'react-native';

import Navbar from '../components/Navbar';
import Colors from '../utils/colors';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerStyle: { backgroundColor: Colors.tabBar, } }}>
      <Stack.Screen name=" " component={Navbar} />
    </Stack.Navigator>
  );
}
