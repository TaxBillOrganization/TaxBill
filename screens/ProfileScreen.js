import React from 'react';
import { Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import IconButton from '../components/IconButton';
import { createStackNavigator } from '@react-navigation/stack';
import Star from 'react-native-star-view';
import styles from './Styles/ProfileScreenStyles';
import firebase from 'firebase';
const ProfilStack = createStackNavigator();

const user ={email:'',Username:'',Usersurname:'',Userage:'', Usergender:''};
var uid=' ';
export default function ProfilStackPage(kullanıcı) { 
    uid=kullanıcı.User.uid
    return (    
    console.error(JSON.stringify(kullanıcı)), 
    firebase.database().ref(('Users/') + uid + ('/ProfileInformation')).once('value').then((snapshot) => {
    user.Username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
    user.Usersurname = (snapshot.val() && snapshot.val().surname) || 'Anonymous';
    user.Userage = (snapshot.val() && snapshot.val().age) || 'Anonymous';
    user.Usergender = (snapshot.val() && snapshot.val().gender) || 'Anonymous';
    }),

    
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
              <Text style={[styles.text, {marginTop:"3%" ,fontWeight: "300", fontSize: 30 }]}>{user.Username + user.Usersurname }</Text>
            </View>
              <IconButton style = {{marginTop:"3%"}}iconName="settings" color="black" size={30} onPress={() => navigation.navigate('Settings')}/>                          
          </View>
               <View style={styles.infoContainer}>
                  <Text style={[styles.text, { color: "#AEB5BC", fontSize: 18  }]}>{('Age:' )+user.Userage}</Text>
                  <Text style={[styles.text, { color: "#AEB5BC", fontSize: 18 }]}>{('Gender:' )+user.Usergender}</Text>
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