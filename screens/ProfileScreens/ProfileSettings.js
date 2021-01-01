import React,{ useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView,LogBox} from "react-native";
import IconButton from '../../components/IconButton';
import { createStackNavigator } from '@react-navigation/stack';
import Star from 'react-native-star-view';
import styles from '../Styles/ProfileScreenStyles';
import * as firebase from 'firebase';
import Photo from '../../components/Firebase/storagePhoto'
import Change from '../../components/Firebase/changeEmailPassword'

import HeaderComponent from "../../components/Header";
import useStatusBar from '../../hooks/useStatusBar';
const ProfilStack = createStackNavigator();
const logo = require('../../assets/logo.png');

export default function ProfilStackPage({navigation}) {
    useStatusBar('light-content');
    const [userstate,setUser] = useState({});
    const uid=firebase.auth().currentUser.uid;  
    useEffect(()=>{
        var user ={email:'',Username:'',Usersurname:'',Userage:'', Usergender:'', image:''};            
        firebase.database().ref('Users/'+uid+'/ProfileInformation').once('value', function (snapshot) {
            user.Username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
            user.Usersurname = (snapshot.val() && snapshot.val().surname) || 'Anonymous';
            user.Userage = (snapshot.val() && snapshot.val().age) || 'Anonymous';
            user.Usergender = (snapshot.val() && snapshot.val().gender) || 'Anonymous';
            user.image=(snapshot.val() && snapshot.val().profilePhoto);
            setUser(user);
          })
    })
        return (
            <SafeAreaView style={styles.container}>
            <HeaderComponent logo={logo}/>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                  <View style={styles.titleBar}>
                    <Photo style={styles.profileImage}></Photo>
                    
                  </View>
                    <IconButton style = {{marginTop:"3%"}}iconName="keyboard-backspace" color="black" size={30} onPress={() => navigation.navigate('Profile')}/>                          
                </View>
                       <View style={styles.infoContainer}>
                          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 18  }]}>{('Age: ')+userstate.Userage }</Text>
                          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 18 }]}>{('Gender: ')+userstate.Usergender}</Text>
                      </View>
                  <View style={styles.statsContainer}>
                      <View style={styles.statsBox}>
                          <Text style={[styles.text, { fontSize: 24 }]}>2</Text>
                          <Text style={[styles.text, styles.subText]}>Travel</Text>
                      </View>
                      <View style={styles.statsBox}>
                          <Star  style={styles.starStyle} score={5} />
                          <Text style={[styles.text, styles.subText]}>Companion Score</Text>
                      </View>
                  </View>
                    <Change/>
                  <View>
                  </View>
              </ScrollView>
          </SafeAreaView>
          );
      }

  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested ',
    'Warning: Can\'t perform a React state update on an unmounted component. '
])
