import  React,{useEffect, useState} from 'react';
import { Text, View, SafeAreaView, Image, ScrollView,StatusBar,TextInput,StyleSheet} from "react-native";
import IconButton from '../../components/IconButton';
import Star from 'react-native-star-view';
import Profilstyles from "../Styles/ProfileScreenStyles";
import firebase from 'firebase';
import mapStyle from "../Styles/mapStyle";
import HeaderComponent from "../../components/Header";
import AppButton from '../../components/commentButton';

const logo = require('../../assets/logo.png');

export default function TravelStackPage({route,navigation}) {
    const [userstate,setUser] = useState({});
    const [activeUser,setActive]=useState({});
    const [starScore,setScor] = useState();
    const [comment,setComment] = useState();
    const selectedItem = route.params.SelectedItem
    const activeUid=firebase.auth().currentUser.uid
  
     useEffect(()=>{
        var user ={email:'',Username:'',Usersurname:'',Userage:'', Usergender:'', image:'',travel:0,starPoint:0};
        var Score=0.0;            
        firebase.database().ref('Users/'+selectedItem.creater+'/ProfileInformation').once('value', function (snapshot) {
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

     useEffect(()=>{
        var User ={Username:'',Usersurname:'', image:''};         
        firebase.database().ref('Users/'+activeUid+'/ProfileInformation').once('value', function (snapshot) {
            User.Username = (snapshot.val() && snapshot.val().name);
            User.Usersurname = (snapshot.val() && snapshot.val().surname);
            User.image=(snapshot.val() && snapshot.val().profilePhoto);
            setActive(User);          
        })
     },[])

    function onCommentPress() {
        if(comment==""){
           console.error("You must enter your comment");
         }
         else{
           firebase.database().ref('Users/'+ selectedItem.creater +('/Comments/')+ activeUid).set({
           text:comment,
           key:activeUid,
           });
         }
      }

  return(
        <SafeAreaView style={Profilstyles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black"/>
        <HeaderComponent logo={logo}/>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginBottom:"5%"}}>
            <View style={Profilstyles.titleBar}>
                <View style={Profilstyles.titleBar}>
                <View style={Profilstyles.profileImage}>
                    <Image source={{uri:userstate.image}} style={Profilstyles.image} resizeMode="center"></Image>                                     
                </View>
                <Text style={[Profilstyles.text, {marginTop:"3%" ,fontWeight: "300", fontSize: 30,flexDirection: "column"}]}>{userstate.Username+' '+userstate.Usersurname}</Text>
                </View>
                <IconButton style = {{marginTop:"3%"}}iconName="keyboard-backspace" color="black" size={30} onPress={() => navigation.goBack()}/>                          
            </View>
                <View style={{marginLeft:"5%"}}>
                    <Text style={[Profilstyles.text, { color: "#AEB5BC", fontSize: 18  }]}>{('Age: ')+userstate.Userage }</Text>
                    <Text style={[Profilstyles.text, { color: "#AEB5BC", fontSize: 18 }]}>{('Gender: ')+userstate.Usergender}</Text>
                </View>
            <View style={mapStyle.statsContainer}>
                <View style={Profilstyles.statsBox}>
                    <Text style={[Profilstyles.text, { fontSize: 24 }]}>{userstate.travel}</Text>
                    <Text style={[Profilstyles.text, Profilstyles.subText]}></Text>
                    <Text style={[Profilstyles.text, Profilstyles.subText]}>Travel</Text>
                </View>
                <View style={Profilstyles.statsBox}>
                    <Star  style={mapStyle.starStyle} score={starScore} />
                    <Text style={[Profilstyles.text, Profilstyles.subText]}>{starScore}</Text>
                    <Text style={[Profilstyles.text, Profilstyles.subText]}>Companion Score</Text>
                </View>
            </View>
            </View>
            <View style={styles.titleBar}>
                     <View style={styles.profileImage}>
                        <Image source={{uri:activeUser.image}} style={styles.image} resizeMode="center"></Image>                                     
                     </View>
                     <View style={styles.textBar}>
                     <Text style={styles.subTextName}>{activeUser.Username+' '+activeUser.Usersurname}</Text>             
                           <View>
                              <TextInput style={styles.textInput} 
                              placeholder="Your Comment" autoCapitalize="words"
                              onChangeText={(text) => { setComment(text)}}
                              />
                              <AppButton title="Comment" onPress={() => onCommentPress()}/>
                           </View>
                     </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    )
  }
  const styles = StyleSheet.create({
    container: {
        flex:1, 
        alignSelf:'auto', 
        justifyContent:'center',
        paddingLeft:"2%",
        paddingRight:"2%",
        marginHorizontal:"2%"
    },
    image: {
      flex: 1,
      width: null,
      alignSelf: "auto",
      borderRadius:20,
      borderColor:"#f5f5f5",
      borderWidth:1,
  },
    titleBar: {
        flexDirection: "row",
        marginBottom: "3%",
        backgroundColor:'#f5f5f5',
        borderRadius: 15
    },
    textBar: {
        flexDirection: "column",
        marginHorizontal:"3%",
        width:"80%"
    },
    subText: {
        fontSize: 16,
        color: "black",
        fontWeight: "500"
    },
    subText1: {
      fontSize: 16,
      color: "red",
      fontWeight: "500"
  },
    subTextName: {
        fontSize: 18,
        color: "black",
        fontWeight: 'bold',
        fontWeight: "700"
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 35,
        overflow: "hidden",
        alignItems:"stretch",
        justifyContent:'center',
        //alignSelf:"center"
        borderColor:"#f5f5f5",
        borderWidth :2
    },
   textInput: {
      textAlign: "center",
      borderWidth:1, 
      borderColor:"gray", 
      borderRadius: 30,
      marginVertical: 5, 
      padding:10, 
      height:40, 
      alignSelf: "stretch", 
      fontSize: 18, 
  },
});