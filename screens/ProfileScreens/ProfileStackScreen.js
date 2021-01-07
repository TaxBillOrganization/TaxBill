import React,{ useState } from 'react';
import Profile from './ProfileScreen';
import Settings from './ProfileSettings';
import { createStackNavigator } from '@react-navigation/stack';

const ProfileStack = createStackNavigator()
export default function chatStackPage() {
return (
  <ProfileStack.Navigator options={{headerShown: false}} screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name="Profile" component={Profile}/>
      <ProfileStack.Screen name='Settings' component={Settings}/>
  </ProfileStack.Navigator>
  );
}