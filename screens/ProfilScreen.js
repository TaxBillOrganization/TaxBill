import React from 'react';
import {Text, View, StyleSheet, Button,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';

export default function Home(){

    return(
      <Text>Profil Screen</Text>
    );
}