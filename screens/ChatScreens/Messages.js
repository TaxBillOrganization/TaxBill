//@refresh reset
import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import IconButton from '../../components/IconButton';
import { Text,StyleSheet,StatusBar,View } from 'react-native'
import {Header,Body} from "native-base";
import * as firebase from 'firebase'
import 'firebase/firestore'

var User ={Username:'',Usersurname:''};

export default function Messages({ route,navigation }) {
const [userstate,setUser] = useState({});
const { thread } = route.params
const [messages, setMessages] = useState([
      {
        _id: 0,
        text: 'thread created',
        createdAt: new Date().getTime(),
        system: true
      },
    ])

const active = firebase.auth().currentUser.toJSON();
              firebase.database().ref('Users/'+ active.uid +'/ProfileInformation').once('value',function (snapshot) {
                  User.Username = (snapshot.val() && snapshot.val().name);
                  User.Usersurname = (snapshot.val() && snapshot.val().surname);
                  setUser(User);
              });

const user = firebase.auth().currentUser.toJSON();
    async function handleSend(messages) {
        const text = messages[0].text
        firebase.firestore()
        .collection('MESSAGE_THREADS')
        .doc(thread._id)
        .collection('MESSAGES')
        .add({
            text,
            createdAt: new Date().getTime(),
            user: {
                _id: user.uid,
                displayName: user.displayName
            }
        })
        await firebase.firestore()
        .collection('MESSAGE_THREADS')
        .doc(thread._id)
        .set(
          {
            latestMessage: {
              text,
              createdAt: new Date().getTime()
            }
          },
          { merge: true }
        )
        //setMessages(GiftedChat.append(messages, newMessage))     
    }

    useEffect(() => {
        const unsubscribeListener = firebase.firestore()
          .collection('MESSAGE_THREADS')
          .doc(thread._id)
          .collection('MESSAGES')
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            const messages = querySnapshot.docs.map(doc => {
              const firebaseData = doc.data()
      
              const data = {
                _id: doc.id,
                text: '',
                createdAt: new Date().getTime(),
                ...firebaseData
              }
      
              if (!firebaseData.system) {
                data.user = {
                  ...firebaseData.user,
                  name: firebaseData.user.displayName
                }
              }
      
              return data
            })
      
            setMessages(messages)
          })
      
        return () => unsubscribeListener()
      }, [])

    return (
    <View style={{flex:1}}>
      <Header style={{backgroundColor:"#eed74d"}} >   
        <Body style ={{alignItems:"flex-start"}}>
        <View style={{flex:1,flexDirection:"row"}}>
        <IconButton style = {{marginTop:"3%"}}iconName="keyboard-backspace" color="black" size={35} onPress={() => navigation.navigate('ChatRoom')}/>
        {(thread.name!=(userstate.Username+(" ")+userstate.Usersurname))&&
            <Text style ={styles.headerText}>{thread.name}</Text>
        }

        {(thread.name==(userstate.Username+(" ")+userstate.Usersurname))&&
            <Text style ={styles.headerText}>{thread.with}</Text>
        }
            
        </View>           
        </Body>
      </Header>
      <StatusBar barStyle="light-content" backgroundColor="black"/>
      <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={{
              _id: user.uid
          }}
      />
    </View>
    )
}
const styles = StyleSheet.create({
	icon:{
		color:"#fff",
		fontSize:20
	},
	headerText:{
		color:"black",
    fontSize:20,
    alignItems:"center",
		fontWeight:"bold",
		marginTop:"4%",
		marginLeft:"2%"
	},
	logo:{
		width:40,
		height:40,
		marginTop:7,
		marginRight:10	
  }
});