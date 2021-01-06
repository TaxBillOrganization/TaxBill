import React,{ useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView,LogBox,StatusBar} from "react-native";
import IconButton from '../../components/IconButton';
import Star from 'react-native-star-view';
import styles from '../Styles/ProfileScreenStyles';
import * as firebase from 'firebase';
import Photo from '../../components/Firebase/storagePhoto'
import Change from '../../components/Firebase/changeEmailPassword'
import HeaderComponent from "../../components/Header";
const logo = require('../../assets/logo.png');

export default function ProfilStackPage({navigation}) {
  const [userstate,setUser] = useState({});
  const uid=firebase.auth().currentUser.uid;
  const [starScore,setScor] = useState();

  useEffect(()=>{
      var user ={email:'',Username:'',Usersurname:'',Userage:'', Usergender:'', image:'',travel:0,starPoint:0};
      var Score=0.0;            
      firebase.database().ref('Users/'+uid+'/ProfileInformation').once('value', function (snapshot) {
          user.Username = (snapshot.val() && snapshot.val().name);
          user.Usersurname = (snapshot.val() && snapshot.val().surname);
          user.Userage = (snapshot.val() && snapshot.val().age);
          user.Usergender = (snapshot.val() && snapshot.val().gender);
          user.image=(snapshot.val() && snapshot.val().profilePhoto);
          user.travel=(snapshot.val() && snapshot.val().travel);
          user.starPoint=(snapshot.val() && snapshot.val().starPoint);
          setUser(user);          
        })
        if(userstate.travel==0){
          Score=0;
        }
        else{
          Score=userstate.starPoint/userstate.travel
        }
        setScor(Score);
  })
        return (
            <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="black"/>
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
                      <Text style={[styles.text, { fontSize: 24 }]}>{userstate.travel}</Text>
                      <Text style={[styles.text, styles.subText]}> </Text>
                      <Text style={[styles.text, styles.subText]}>Travel</Text>
                  </View>
                  <View style={styles.statsBox}>
                      <Star  style={styles.starStyle} score={starScore} />
                      <Text style={[styles.text, styles.subText]}>{starScore}</Text>
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
