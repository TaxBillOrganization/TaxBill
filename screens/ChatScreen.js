import React,{ useState } from 'react';
import ChatRoom from './ChatRoom';
import Messages from './Messages';
import CreateChatRoom from './CreateChatRoom'

import { createStackNavigator } from '@react-navigation/stack';

const chatStack = createStackNavigator()
export default function ProfilStackPage(kullanıcı) {
return (    
  <chatStack.Navigator options={{headerShown: true}} screenOptions={{headerShown: true}}>
      <chatStack.Screen name="ChatRoom" component={ChatRoom} />
      <chatStack.Screen name="CreateChatRoom" component={CreateChatRoom} user = {kullanıcı} />
      <chatStack.Screen name='Messages' component={Messages} 
      options={({ route }) => ({
      title: route.params.thread.name
      })} 
      />
  </chatStack.Navigator>
  );
}