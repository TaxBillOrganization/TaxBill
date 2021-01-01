import React,{ useState } from 'react';
import ChatRoom from './ChatRoom';
import Messages from './Messages';
import useStatusBar from '../../hooks/useStatusBar';
import { createStackNavigator } from '@react-navigation/stack';

const chatStack = createStackNavigator()
export default function chatStackPage() {
  useStatusBar('light-content');
return (
  <chatStack.Navigator options={{headerShown: false}} screenOptions={{headerShown: false}}>
      <chatStack.Screen name="ChatRoom" component={ChatRoom}/>
      <chatStack.Screen name='Messages' component={Messages}
      options={({ route }) => ({
      title: route.params.thread.name
      })} />
  </chatStack.Navigator>
  );
}