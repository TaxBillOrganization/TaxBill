import * as firebase from 'firebase';
import React, {Component} from 'react';
import {View,Text, FlatList, StyleSheet, TextInput,Image} from 'react-native';
import AppButton from '../../components/commentButton';

export default class Comment extends Component{
   constructor(props){
   super(props);
   this.state={ 
   list:[],
   answer:"",
   } }
   
   componentDidMount(){
         var user = firebase.auth().currentUser;
         firebase.database().ref('Users/'+ user.uid + ('/Comments')).once('value', (data) =>{
            var li = []
            data.forEach((child)=>{    
               var user = {Username:'',Usersurname:'', image:''}              
               firebase.database().ref('Users/'+ child.val().key +'/ProfileInformation').on('value',function (information) {
                  user.Username = information.val().name
                  user.Usersurname = information.val().surname
                  user.image= information.val().profilePhoto
                  li.push({
                     key: child.val().key,
                     text:child.val().text,
                     answer:child.val().answer,
                     name:user.Username,
                     surname:user.Usersurname,
                     photo:user.image
                  })   
               });
            })
         this.setState({list:li})   
      })
   }

   onAnswerPress = (commentId) => {
      if(this.state.answer==""){
         console.error("You must enter your answer");
       }
       else{
         var user = firebase.auth().currentUser;
         firebase.database().ref('Users/'+ user.uid +('/Comments/')+ commentId).update({
         answer:this.state.answer,
         });
       }
    }
    
   
   render(){
   return(
      <View style={styles.container}>
         <FlatList style={{width:'100%'}}
            data={this.state.list}
            keyExtractor={(item)=>item.key}
            renderItem={({item})=>{
               return(
                  <View style={styles.titleBar}>
                     <View style={styles.profileImage}>
                        <Image source={{uri:item.photo}} style={styles.image} resizeMode="center"></Image>                                     
                     </View>
                     <View style={styles.textBar}>
                        <Text style={styles.subTextName}>{item.name} {item.surname}</Text>
                        <Text style={styles.subText}>{item.text}</Text>
                        {(!item.answer || item.answer == "")&&
                           <View>
                              <TextInput style={styles.textInput} 
                              placeholder="Your Answer" autoCapitalize="words"
                              onChangeText={(text) => { this.setState({answer: text})}}
                              />
                              <AppButton title="Answer" onPress={() => this.onAnswerPress(item.key)}/>
                           </View>
                        }  
                        {(item.answer)&&
                           <View>
                              <Text style={styles.subText1}>{item.answer}</Text> 
                           </View>
                        }  
                     </View>
                  </View>)
               }}/>
      </View>
   )}
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