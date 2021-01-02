import React from 'react';
import { View, StyleSheet, Text, Image, StatusBar } from 'react-native';

import AppButton from '../components/AppButton';
import Colors from '../utils/colors';
import useStatusBar from '../hooks/useStatusBar';

export default function WelcomeScreen({ navigation }) {
  useStatusBar('light-content');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black"/>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Login"  onPress={() => navigation.navigate('Login')} />
        <AppButton title="Register" onPress={() => navigation.navigate('Register')}/>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColor
  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center'
  },
  logo: {
    width: 200,
    height: 200
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 20,
    color: Colors.textColor
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 60,
    color: Colors.appButtonColor,
    width: '100%'
  },
});
