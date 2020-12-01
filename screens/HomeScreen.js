import React from 'react';
import {Text, View, StyleSheet, Button,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';

export default function Home(){
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }}
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    );
}