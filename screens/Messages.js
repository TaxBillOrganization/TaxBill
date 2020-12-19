//@refresh reset
import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, Button } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'

export default function Messages({ route }) {
const { thread } = route.params
const [messages, setMessages] = useState([
      /*{
        _id: 0,
        text: 'thread created',
        createdAt: new Date().getTime(),
        system: true
      },*/

    ])
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
        setMessages(GiftedChat.append(messages, newMessage))     
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
    <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{
            _id: user.uid
        }}
    />
    )
}