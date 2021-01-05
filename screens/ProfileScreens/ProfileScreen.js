import React,{ useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, ScrollView,LogBox,StatusBar,RefreshControl,TouchableOpacity} from "react-native";
import IconButton from '../../components/IconButton';
import Star from 'react-native-star-view';
import styles from '../Styles/ProfileScreenStyles';
import * as firebase from 'firebase';
import Comment from '../../components/Firebase/comment'
import HeaderComponent from "../../components/Header";
const logo = require('../../assets/logo.png');
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
export default function ProfilStackPage({navigation}) {
    const [userstate,setUser] = useState({});
    const uid=firebase.auth().currentUser.uid;
    const [starScore,setScor] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [oldTravel, setTravel] = useState(0);
    const [oldRefresh, setRefresh] = useState(0);
    const [commentVisible,setCommentVisible] = useState(false);
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

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
            user.refresh=(snapshot.val() && snapshot.val().refresh);
            setUser(user);          
          })
          if(userstate.travel==0)Score=0
          else{
            Score=userstate.starPoint/userstate.travel
            Score=Number(Score.toFixed(1))
          }
          setScor(Score);
          if(userstate.travel!=oldTravel||userstate.refresh!=oldRefresh){
            setTravel(userstate.travel)
            setRefresh(userstate.refresh)
            if(commentVisible==true)setCommentVisible(false)
            else setCommentVisible(true) 
          }     
    })

        return (
          <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="black"/>
          <HeaderComponent logo={logo}/>
          <ScrollView showsVerticalScrollIndicator={false} efreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
              <View style={styles.titleBar}>
                <View style={styles.titleBar}>
                  <View style={styles.profileImage}>
                      <Image source={{uri:userstate.image}} style={styles.image} resizeMode="center"></Image>                                     
                  </View>
                  <Text style={[styles.text, {marginTop:"3%" ,fontWeight: "300", fontSize: 30,flexDirection: "column"}]}>{userstate.Username+' '+userstate.Usersurname}</Text>
                </View>
                  <IconButton style = {{marginTop:"3%"}}iconName="settings" color="black" size={30} onPress={() => navigation.navigate('Settings')}/>                          
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
              <View style={{ marginTop: "1.5%" }}>
                <Text style={[styles.text, { color: "#AEB5BC", fontSize: 18,alignSelf:"center",marginBottom:"1%" }]}>COMMENTS</Text>   
                {commentVisible==false && <Comment id={uid}/>}
                {commentVisible==true && <Comment id={uid}/>}      
              </View>
          </ScrollView>
      </SafeAreaView>);
      }

  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested ',
    'Warning: Can\'t perform a React state update on an unmounted component. ',
    'Failed prop type: The prop `score` is marked as required in `Star`, but its value is `undefined`'
])
