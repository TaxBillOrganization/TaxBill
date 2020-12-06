import React from 'react';
import {Image,StyleSheet,Text,View,TextInput,TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView from 'react-native-maps';
//import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';
import Constants from 'expo-constants';
//import MapContainer from '../containers/MapContainer';
import Root from '../map/src/main';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Root {...this.props}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});