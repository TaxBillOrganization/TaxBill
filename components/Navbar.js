import React from 'react';
import {Text, View, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';

import Home from '../screens/HomeScreen';
import Search from '../screens/SearchScreen';
import Chat from '../screens/ChatScreen';
import Travel from '../screens/TravelScreen';
import Profil from '../screens/ProfilScreen';
import Colors from '../utils/colors';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  useStatusBar('dark-content');
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  function HomePage() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Home/>
         <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    );
  }
  function SearchPage() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Search/>
      </View>
    );
  }
  function ChatPage() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Chat/>
      </View>
    );
  }
  function TravelPage() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Travel/>
      </View>
    );
  }
  function ProfilPage() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Profil/>
      </View>
    );
  }

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                <Ionicons
                  name={focused? 'ios-navigate' : 'ios-navigate'}
                  size={size}
                  color={color}
                />
              );
            } 
              else if (route.name === 'Search') {
              return (
                <Ionicons
                  name={focused ? 'ios-search' : 'ios-search'}
                  size={size}
                  color={color}
                />
              );
            }
            else if (route.name === 'Chat') {
              return (
                <Ionicons
                  name={focused ? 'ios-chatboxes' : 'ios-chatboxes'}
                  size={size}
                  color={color}
                />
              );
            }
            else if (route.name === 'Travel') {
              return (
                <Ionicons
                  name={focused ? 'logo-model-s' : 'logo-model-s'}
                  size={size}
                  color={color}
                />
              );
            }
            else if (route.name === 'Profil') {
              return (
                <Ionicons
                  name={focused ? 'md-person' : 'md-person'}
                  size={size}
                  color={color}
                />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.black,
          inactiveTintColor: Colors.mediumGrey,
          activeBackgroundColor: Colors.tabBar,
          inactiveBackgroundColor: Colors.tabBar
        }}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Search" component={SearchPage} />
        <Tab.Screen name="Chat" component={ChatPage} />
        <Tab.Screen name="Travel" component={TravelPage} />
        <Tab.Screen name="Profil" component={ProfilPage} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
