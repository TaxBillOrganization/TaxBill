import React, { useState, useEffect } from 'react'
import {View,StyleSheet,Text,FlatList,TouchableOpacity,ActivityIndicator,Image,StatusBar} from 'react-native'
import * as firebase from 'firebase';
import Separator from '../../components/Firebase/Separator'
import HeaderComponent from "../../components/Header";
const logo = require('../../assets/logo.png');

export default function ChatRoom({navigation}) {
   const [threads, setThreads] = useState([])
   const [loading, setLoading] = useState(true)
   const [userstate,setUser] = useState({});

   useEffect(() => {
    var User ={Username:'',Usersurname:'',Userphoto:''};
     
    const user = firebase.auth().currentUser;
    firebase.database().ref('Users/'+ user.uid +'/ProfileInformation').once('value',function (snapshot) {
        User.Username = (snapshot.val() && snapshot.val().name);
        User.Usersurname = (snapshot.val() && snapshot.val().surname);
        User.Userphoto = (snapshot.val() && snapshot.val().profilePhoto);
        setUser(User);
    });

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
        var x = user.uid;
        const serchingData = threads.filter(item => {
        const name = `${item.Id.toLowerCase()}`;
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
        <HeaderComponent logo={logo}/>
        <View style={styles.container1}>
        <FlatList
          data={threads}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.titleBar} onPress={() => navigation.navigate('Messages', { thread: item })}>
              <View style={styles.row}>
              <StatusBar barStyle="light-content" backgroundColor="black"/>
                <View style={styles.content}>

            {(item.name==(userstate.Username+(" ")+userstate.Usersurname))&&
                  <View style={styles.titleBar}>
                     <View style={styles.profileImage}>
                        <Image source={{uri:item.WithPhoto}} style={styles.image} resizeMode="center"></Image>                                     
                     </View>
                     <View style={styles.textBar}>
                        <Text style={styles.nameText}>  {item.with}</Text>
                        <Text style={styles.contentText}>  {item.latestMessage.text.slice(0, 90)}</Text>
                     </View>
                  </View>
            }
            {(item.with==(userstate.Username+(" ")+userstate.Usersurname))&&
                  <View style={styles.titleBar}>
                     <View style={styles.profileImage}>
                        <Image source={{uri:item.UserPhoto}} style={styles.image} resizeMode="center"></Image>                                     
                     </View>
                     <View style={styles.textBar}>
                        <Text style={styles.nameText}>  {item.name}</Text>
                        <Text style={styles.contentText}>  {item.latestMessage.text.slice(0, 90)}</Text>
                     </View>
                  </View>
            }
                </View>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
        </View>
      </View>
    )
  }
  const styles = StyleSheet.create({
   container: {
    flex:1, 
   },
   container1: { 
    alignSelf:'auto', 
    justifyContent:'center',
    paddingLeft:"2%",
    paddingRight:"2%",
    marginHorizontal:"2%"
   },
   row: {
     paddingRight: "2%",
     paddingLeft: "2%",
     paddingVertical: "2%",
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
   },
   titleBar: {
    flexDirection: "row",
    marginBottom: "1%",
    backgroundColor:'#f5f5f5',
    borderRadius: 15
  },
  image: {
    flex: 1,
    width: null,
    alignSelf: "auto",
    borderRadius:20,
    borderColor:"#f5f5f5",
    borderWidth:1,
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
  textBar: {
    flexDirection: "column",
    marginHorizontal:"3%",
    width:"80%",
    marginTop:"2%"
},    
 })