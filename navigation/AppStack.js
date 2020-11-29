import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Navbar from '../components/Navbar';
import Colors from '../utils/colors';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen style={styles.tab} name=" " component={Navbar} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  tab: {
    backgroundColor: Colors.tabBar
  }});