import React from 'react';
import {Button, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';

export default
class App extends React.Component {

    render() {
      return (
        
        <MapView
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            initialRegion={{
            latitude: 40.742706,
            longitude: 30.331493,
            latitudeDelta: 0.0423,
            longitudeDelta: 0.0321}}
          ></MapView>
      ); 
    } 
    
  }


/*
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
*/
