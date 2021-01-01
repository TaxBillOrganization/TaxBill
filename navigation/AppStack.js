import React from 'react';
import { Ionicons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/HomeScreen';
import Search from '../screens/SearchScreen';
import Chat from '../screens/ChatScreens/ChatScreen';
import Travel from '../screens/TravelScreen';
import Colors from '../utils/colors';
import Profil from '../screens/ProfileScreens/ProfileStackScreen'
import useStatusBar from '../hooks/useStatusBar';

const Tab = createBottomTabNavigator();

export default function AppStack(User) {
  
  function HomePage() {
    useStatusBar('light-content');
    return (<Home/>);
  }
  function SearchPage() {
    useStatusBar('light-content');
    return (<Search/>);
  }
  function ChatPage() {
    useStatusBar('light-content');
    return (<Chat/>);
  }
  function TravelPage() {
    useStatusBar('light-content');
    return (<Travel/>);
  }
  function ProfilPage() { 
    useStatusBar('light-content');
    return (<Profil kullanıcı={User}/>);
  }
  
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                <Ionicons
                  name={focused? 'ios-navigate' : 'ios-navigate'} size={size} color={color}/>
              );
            } 
              else if (route.name === 'Search') {
              return (
                <Ionicons
                  name={focused ? 'ios-search' : 'ios-search'} size={size} color={color} />
              );
            }
            else if (route.name === 'Chat') {
              return (
                <Ionicons
                  name={focused ? 'ios-chatboxes' : 'ios-chatboxes'} size={size} color={color}/>
              );
            }
            else if (route.name === 'Travel') {
              return (
                <Ionicons
                  name={focused ? 'logo-model-s' : 'logo-model-s'} size={size} color={color}/>
              );
            }
            else if (route.name === 'Profil') {
              return (
                <Ionicons
                  name={focused ? 'md-person' : 'md-person'} size={size} color={color}/>
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