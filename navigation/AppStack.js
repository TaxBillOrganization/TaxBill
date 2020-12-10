import * as React from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { StyleSheet, Image , View } from 'react-native';

import Navbar from '../components/Navbar';
import Colors from '../utils/colors';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator options={{headerShown: false}} screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name=" " component={Navbar} />
    </Stack.Navigator>
  );
}
