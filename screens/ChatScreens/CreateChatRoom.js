import React,{ useState } from 'react';
import { Text, View, Button,TouchableOpacity,TextInput,StyleSheet } from 'react-native';
import * as firebase from 'firebase';
var User ={Username:'',Usersurname:''};
export default function CreateChatRoom({navigation,route}) {
  // ... rest remains same
  const [roomName, onChangeText] = React.useState();
  const [userstate,setUser] = useState({});
 
  const user = firebase.auth().currentUser.toJSON();
            firebase.database().ref('Users/'+ user.uid +'/ProfileInformation').once('value',function (snapshot) {
                User.Username = (snapshot.val() && snapshot.val().name);
                User.Usersurname = (snapshot.val() && snapshot.val().surname);
                setUser(User);
            });
    function handleButtonPress() {
      if (roomName.length > 0) {
        // create new thread using firebase & firestore
        firebase.firestore()
          .collection('MESSAGE_THREADS')
          .add({
            name: userstate.Username + (" ") +userstate.Usersurname,
            with: roomName,
            latestMessage: {
              text: `Start chat with ${roomName}`,
              createdAt: new Date().getTime()
            }
          })
          .then(docRef => {
            docRef.collection('MESSAGES').add({
              text: `Start chat with ${roomName}`,
              createdAt: new Date().getTime(),
              system: true
            })
            navigation.navigate('ChatRoom')
          })
      }
   }
  return(
    <View>
    <TextInput style={styles.textInput} value={roomName}
      onChangeText={text => onChangeText(text)}
      placeholder="Room Name" value={roomName}
   />
   <Button title="creat" onPress={handleButtonPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  text: { 
      color: "white", 
      fontWeight: "bold", 
      textAlign: "center", 
      fontSize: 20, 
  },
  textInput: {
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