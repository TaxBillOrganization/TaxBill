import React from 'react';
import { Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons} from '@expo/vector-icons';
import IconButton from '../components/IconButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/HomeScreen';
import Search from '../screens/SearchScreen';
import Chat from '../screens/ChatScreen';
import Travel from '../screens/TravelScreen';
import Colors from '../utils/colors';
import Star from 'react-native-star-view';
import styles from './NavbarStyles';

const Tab = createBottomTabNavigator();
const ProfilStack = createStackNavigator();

export default function AppStack() {
  function HomePage() {
    return (<Home/>);
  }
  function SearchPage() {
    return (<Search/>);
  }
  function ChatPage() {
    return (<Chat/>);
  }
  function TravelPage() {
    return (<Travel/>);
  }
  function ProfilStackPage() { 
    return (
    <ProfilStack.Navigator options={{headerShown: false}} screenOptions={{
      headerShown: false
    }}>
    <ProfilStack.Screen name="Profile" component={ProfilPage} />
    <ProfilStack.Screen name="Settings" component={ProfilSettingsPage} />
    </ProfilStack.Navigator>
    );
  }
  function ProfilPage({navigation}) {
    return (
      <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
            <View style={styles.titleBar}>
              <View style={styles.profileImage}>
                  <Image source={require("../assets/logo.png")} style={styles.image} resizeMode="center"></Image>                        
              </View>
              <Text style={[styles.text, {marginTop:"3%" ,fontWeight: "300", fontSize: 30 }]}>Arda Vural</Text>
            </View>
              <IconButton style = {{marginTop:"3%"}}iconName="settings" color="black" size={30} onPress={() => navigation.navigate('Settings')}/>                          
          </View>
               <View style={styles.infoContainer}>
                  <Text style={[styles.text, { color: "#AEB5BC", fontSize: 18  }]}>Age: 22</Text>
                  <Text style={[styles.text, { color: "#AEB5BC", fontSize: 18 }]}>Sex: Man</Text>
              </View>
          <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                  <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
                  <Text style={[styles.text, styles.subText]}>Travel</Text>
              </View>
              <View style={styles.statsBox}>
                  <Star  style={styles.starStyle} score={3.8} />
                  <Text style={[styles.text, styles.subText]}>Companion Score</Text>
              </View>
          </View>

          <View style={{ marginTop: 32 }}>
              <ScrollView>
                  <View style={styles.mediaImageContainer}>
                      <Image source={require("../assets/flame.png")} style={styles.image} resizeMode="cover"></Image>
                  </View>
                  <View style={styles.mediaImageContainer}>
                      <Image source={require("../assets/logo.png")} style={styles.image} resizeMode="cover"></Image>
                  </View>
                  <View style={styles.mediaImageContainer}>
                      <Image source={require("../assets/splash.png")} style={styles.image} resizeMode="cover"></Image>
                  </View>
              </ScrollView>
          </View>
      </ScrollView>
  </SafeAreaView>);
  }
  function ProfilSettingsPage({navigation}) {
    return (
      <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleBar}>
              <View style={styles.titleBar}>
                <View style={styles.profileImage}>
                    <Image source={require("../assets/logo.png")} style={styles.image} resizeMode="center"></Image>                        
                </View>
                <Text style={[styles.text, {marginTop:"3%" ,fontWeight: "300", fontSize: 30 }]}>Arda Vural</Text>
              </View>
                <IconButton style = {{marginTop:"3%"}}iconName="keyboard-backspace" color="black" size={30} onPress={() => navigation.goBack()}/>                          
            </View>
                   <View style={styles.infoContainer}>
                      <Text style={[styles.text, { color: "#AEB5BC", fontSize: 18  }]}>Age: 22</Text>
                      <Text style={[styles.text, { color: "#AEB5BC", fontSize: 18 }]}>Sex: Man</Text>
                  </View>
              <View style={styles.statsContainer}>
                  <View style={styles.statsBox}>
                      <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
                      <Text style={[styles.text, styles.subText]}>Travel</Text>
                  </View>
                  <View style={styles.statsBox}>
                      <Star  style={styles.starStyle} score={3.8} />
                      <Text style={[styles.text, styles.subText]}>Companion Score</Text>
                  </View>
              </View>
          </ScrollView>
      </SafeAreaView>
  );
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
        <Tab.Screen name="Profil" component={ProfilStackPage} />
      </Tab.Navigator>
  );
}