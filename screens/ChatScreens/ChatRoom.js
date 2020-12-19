
import React, { useState, useEffect } from 'react'
import {View,StyleSheet,Text,FlatList,TouchableOpacity,ActivityIndicator,Button} from 'react-native'
import * as firebase from 'firebase';
import Separator from '../../components/Firebase/Separator'

export default function ChatRoom({navigation}) {
   const [threads, setThreads] = useState([])
   const [loading, setLoading] = useState(true)
   const [editThreads,setEdit] = useState([])

   useEffect(() => {
     const unsubscribe = firebase.firestore()
       .collection('MESSAGE_THREADS')
       .orderBy('latestMessage.createdAt', 'desc',)
       .onSnapshot(querySnapshot => {
         const threads = querySnapshot.docs.map(documentSnapshot => {
           return {
             _id: documentSnapshot.id,
             name: '',
             latestMessage: { text: '' },
             ...documentSnapshot.data()
           }
         })
         var x = "Arda";
         const serchingData = threads.filter(item => {
           const name = `${item.with.toLowerCase()} ${item.name.toLowerCase()}`;
           return name.indexOf(x.toLowerCase()) > -1})
         setThreads(serchingData)
         if (loading) {
           setLoading(false)
         }
       })

     return () => unsubscribe()
   }, [])
 
   if (loading) {
     return <ActivityIndicator size='large' color='#555' />
   }

   return (
      <View style={styles.container}>
        <FlatList
          data={threads}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Messages', { thread: item })}>
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.header}>
                    <Text style={styles.nameText}>{item.name}</Text>
                  </View>
                  <Text style={styles.contentText}>
                    {item.latestMessage.text.slice(0, 90)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
        <Button title="creat" onPress={() => navigation.navigate('CreateChatRoom')}/>
      </View>
    )
  }
  const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#dee2eb'
   },
   title: {
     marginTop: 20,
     marginBottom: 30,
     fontSize: 28,
     fontWeight: '500'
   },
   row: {
     paddingRight: 10,
     paddingLeft: 5,
     paddingVertical: 5,
     flexDirection: 'row',
     alignItems: 'center'
   },
   content: {
     flexShrink: 1
   },
   header: {
     flexDirection: 'row'
   },
   nameText: {
     fontWeight: '600',
     fontSize: 18,
     color: '#000'
   },
   dateText: {},
   contentText: {
     color: '#949494',
     fontSize: 16,
     marginTop: 2
   }
 })