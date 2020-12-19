import * as firebase from 'firebase';
import React, {Component} from 'react';
import {View,Text, FlatList, StyleSheet, Image} from 'react-native';


export default class Comment extends Component{
   constructor(props){
   super(props);
   this.state={ 
   list:[],
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
                     name:user.Username,
                     surname:user.Usersurname,
                     photo:user.image
                  })   
               });
            })
         this.setState({list:li})   
      })
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
        paddingRight:"2%"
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
});