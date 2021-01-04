import  React,{useState,useEffect} from 'react';
import { Text, View, SafeAreaView, Image, ScrollView,StatusBar,TouchableOpacity,} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {List,ListItem, Body,Right} from "native-base";
import styles from "../Styles/searchScreenStyles";
import Profilstyles from "../Styles/ProfileScreenStyles";
import firebase from 'firebase';
import HeaderComponent from "../../components/Header";
import useStatusBar from '../../hooks/useStatusBar';
import AppButton from '../../components/commentButton';

const logo = require('../../assets/logo.png');

export default function TravelScreen({navigation}) {
  useStatusBar('light-content');

  const [currentTravel,setCurrentTravel] = useState();
  const [oldTravel,setOldTravel] = useState();
  //const [loadingState,setLoading] = useState(true);
  const [selectedItem,setSelectedItem] = useState(null);
  const [regionn,setRegion] = useState({});

    useEffect(()=>{     
        var user = firebase.auth().currentUser;
        var oldResult=[];
        var currentResult=[];
        firebase.database().ref('Users/'+user.uid+"/Travels/").once('value',function (snapshot) {
            snapshot.forEach(function(item){
                if(item.val().statu == "c"){
                firebase.database().ref('Travels/'+item.val().Id).once('value',function (snapshot) {
                    firebase.database().ref('Users/'+ snapshot.val().creater +'/ProfileInformation').once('value',function (get) {
                    currentResult.push({
                        date : (snapshot.val() && snapshot.val().date) || 'Anonymous',
                        dropOffLatitude : (snapshot.val() && snapshot.val().dropOffLatidute) || 'Anonymous',
                        dropOffLongitude : (snapshot.val() && snapshot.val().dropOffLongitude) || 'Anonymous',
                        female : (snapshot.val() && snapshot.val().female) || 'Anonymous',
                        male : (snapshot.val() && snapshot.val().male) || 'Anonymous',
                        people : (snapshot.val() && snapshot.val().people) || 'Anonymous',
                        person : (snapshot.val() && snapshot.val().person) || 'Anonymous',
                        pickUpLatitude : (snapshot.val() && snapshot.val().pickUppLatidute) || 'Anonymous',
                        pickUpLongitude : (snapshot.val() && snapshot.val().pickUppLongitude) || 'Anonymous',
                        statu : (snapshot.val() && snapshot.val().statu) || 'Anonymous',
                        Id : (snapshot.val() && snapshot.val().Id) || 'Anonymous',
                        creater : (snapshot.val() && snapshot.val().creater) || 'Anonymous',
                        startPlace : (snapshot.val() && snapshot.val().startPointId) || 'Anonymous',
                        endPlace : (snapshot.val() && snapshot.val().endPointId) || 'Anonymous',
                        name : (get.val() && get.val().name),
                        surname : (get.val() && get.val().surname),
                        photo : (get.val() && get.val().profilePhoto),                                 
                    });                 
                    setCurrentTravel(currentResult);
                    });
                }); 

                }else if(item.val().statu == "f"){
    
                firebase.database().ref('Travels/'+item.val().Id).once('value',function (snapshot) {
    
                    firebase.database().ref('Users/'+ snapshot.val().creater +'/ProfileInformation').once('value',function (get) {
                    oldResult.push({
                        date : (snapshot.val() && snapshot.val().date) || 'Anonymous',
                        dropOffLatitude : (snapshot.val() && snapshot.val().dropOffLatidute) || 'Anonymous',
                        dropOffLongitude : (snapshot.val() && snapshot.val().dropOffLongitude) || 'Anonymous',
                        female : (snapshot.val() && snapshot.val().female) || 'Anonymous',
                        male : (snapshot.val() && snapshot.val().male) || 'Anonymous',
                        people : (snapshot.val() && snapshot.val().people) || 'Anonymous',
                        person : (snapshot.val() && snapshot.val().person) || 'Anonymous',
                        pickUpLatitude : (snapshot.val() && snapshot.val().pickUppLatidute) || 'Anonymous',
                        pickUpLongitude : (snapshot.val() && snapshot.val().pickUppLongitude) || 'Anonymous',
                        statu : (snapshot.val() && snapshot.val().statu) || 'Anonymous',
                        Id : (snapshot.val() && snapshot.val().Id) || 'Anonymous',
                        creater : (snapshot.val() && snapshot.val().creater) || 'Anonymous',
                        startPlace : (snapshot.val() && snapshot.val().startPointId) || 'Anonymous',
                        endPlace : (snapshot.val() && snapshot.val().endPointId) || 'Anonymous',
                        name : (get.val() && get.val().name),
                        surname : (get.val() && get.val().surname),
                        photo : (get.val() && get.val().profilePhoto),          
                    });
                    setOldTravel(oldResult);
                    });
                }); 
            }
            });
        });
    }, []);

    function deleteTravel(item){
    setSelectedItem(item);
            var user = firebase.auth().currentUser;
            var control = false;
            firebase.database().ref('Users/'+user.uid+'/Travels/'+item.Id).on('value',function (snapshot) {
                
                if(snapshot.val() == "c"){
                    control = true;
                }
            });
            var dropOffLat = item.dropOffLatitude;
            var pickUppLat = item.pickUpLatitude;

            var dropOffLng = item.dropOffLongitude;
            var pickUppLng = item.pickUpLongitude;

            var midX = ((dropOffLat + pickUppLat) / 2);
            var midY = ((dropOffLng + pickUppLng) / 2);

            var deltaLat = dropOffLng -  pickUppLng;
            var deltaLng = dropOffLat - pickUppLat;
            if(deltaLat < 0){
                deltaLat = deltaLat * (-1);
            }
            if(deltaLng < 0 ){
                deltaLng = deltaLng * (-1);
            }

            var region={
                latitude:midX,longitude:midY,latitudeDelta:deltaLat+0.5,longitudeDelta:deltaLng+0.5
            }
            setRegion(region);
        navigation.navigate("DeleteTravel",{ Region:region , Item:item });
    }
    function CommentTravel(item){
        setSelectedItem(item);
        navigation.navigate("Comment",{SelectedItem:item});
    }
    return(
    <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="black"/>
        <HeaderComponent logo={logo}/>
        <ScrollView>       
        <View >
            <View style ={{alignItems:"center"}}>
            <Text style={[Profilstyles.text, { color: "#AEB5BC", fontSize: 18,alignSelf:"center",marginBottom:"1%" }]}>Current Travels</Text>
            </View>
                <List
                dataArray={currentTravel}
                keyExtractor={item => item.Id}
                renderRow={(item)=>
                        <View style={Profilstyles.container}>
                            <ListItem onPress={()=>deleteTravel(item)} button avatar >
                            <Body style={{flexDirection:"column"}}>
                            <View style={{flexDirection:"row"}}>
                                <Text style={styles.text} >{item.name +(" ")+ item.surname}</Text>
                            </View>
                            <View style={{flexDirection:"row"}}>
                                <Icon  name="home" style={{marginTop:"1%",marginRight:"1%"}}/>
                                <Text >{item.startPlace}</Text>
                            </View>
                            <View style={{flexDirection:"row",marginBottom:"5%"}}>
                                <Icon  name="send" style={{marginTop:"1%",marginRight:"1%"}}/>
                                <Text >{item.endPlace}</Text>
                            </View>
                            <View style={{flexDirection:"row",marginTop:"3%",marginRight:"1%"}}>
                                <Icon  name="clock-o" style={{marginTop:"1%",marginRight:"1%"}}/>
                                <Text>{item.date} </Text>
                            </View>
                            </Body>
                            <Right style={styles.profileImage}>
                            <Image source={{uri:item.photo}} style={styles.image} resizeMode="center"></Image> 
                            </Right>
                            </ListItem>  
                        </View>
                    }/>
        </View>
        <View style={{marginTop:30}}>
            <View style ={{alignItems:"center",fontSize:"bold"}}>
            <Text style={[Profilstyles.text, { color: "#AEB5BC", fontSize: 18,alignSelf:"center",marginBottom:"1%" }]}>Old Travels</Text>
            </View>
                <List
                dataArray={oldTravel}
                keyExtractor={item => item.Id}
                renderRow={(item)=>
                    <View style={Profilstyles.container}>
                    <ListItem onPress={()=>CommentTravel(item)} button avatar >
                    <Body style={{flexDirection:"column"}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.text} >{item.name +(" ")+ item.surname}</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Icon  name="home" style={{marginTop:"1%",marginRight:"1%"}}/>
                        <Text >{item.startPlace}</Text>
                    </View>
                    <View style={{flexDirection:"row",marginBottom:"5%"}}>
                        <Icon  name="send" style={{marginTop:"1%",marginRight:"1%"}}/>
                        <Text >{item.endPlace}</Text>
                    </View>
                    <View style={{flexDirection:"row",marginTop:"3%",marginRight:"1%"}}>
                        <Icon  name="clock-o" style={{marginTop:"1%",marginRight:"1%"}}/>
                        <Text>{item.date} </Text>
                    </View>
                    </Body>
                    <Right style={styles.profileImage}>
                    <Image source={{uri:item.photo}} style={styles.image} resizeMode="center"></Image> 
                    </Right>
                    </ListItem>  
                </View>
                }/>     
            </View>
        </ScrollView>
    </SafeAreaView>
    ) 
}
  