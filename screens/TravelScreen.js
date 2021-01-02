import  React,{useState,useEffect} from 'react';
import { Text, View, SafeAreaView, Image, ScrollView,Button,RefreshControl,TouchableOpacity 
,ActivityIndicator} from "react-native";
import IconButton from '../components/IconButton';
import Icon from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Star from 'react-native-star-view';
import axios from 'axios';
import {InputGroup,Input,List,ListItem, Left, Body,Right} from "native-base";
import styles from "./Styles/searchScreenStyles";
import Profilstyles from "./Styles/ProfileScreenStyles";
import firebase from 'firebase';
const GOOGLE_MAPS_APIKEY = 'AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI';
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import mapStyle from "./Styles/mapStyle";
import HeaderComponent from "../components/Header";
import useStatusBar from '../hooks/useStatusBar';

const logo = require('../assets/logo.png');
const ProfilStack = createStackNavigator();


export default function TravelStackPage() {
  useStatusBar('light-content');

    const [currentTravel,setCurrentTravel] = useState([]);
    const [oldTravel,setOldTravel] = useState([]);
    const [loading, setLoading] = useState(true)
    const [liste,setListe] = useState(false)
    const [selectedItem,setSelectedItem] = useState(null);
    const [userstate,setUser] = useState({});
    const [region,setRegion] = useState({});
    const [isAvailable,setAvailable] = useState();


    const wait = (timeout) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      });
    }
    
  function TravelPage({navigation}){
    useStatusBar('light-content');
    const [refreshing, setRefreshing] = React.useState(false);
      
          const onRefresh = React.useCallback(() => {
            
            setRefreshing(true);
            wait(2000).then(() => setRefreshing(false));
          }, []);

    
    function deleteTravel(item){
      setSelectedItem(item);
      setSelectedItem(item);
            var user = firebase.auth().currentUser;
            var control = false;
            var passengers=[];
            firebase.database().ref('Users/'+user.uid+'/Travels/'+item.Id).on('value',function (snapshot) {
                 
                if(snapshot.val() == "c"){
                    control = true;
                }
            });
            setAvailable(control)
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

            var USER ={email:'',Username:'',Usersurname:'',Userage:'', Usergender:'', image:''};
            firebase.database().ref('Users/'+ item.creater +'/ProfileInformation').once('value',function (snapshot) {
              USER.Username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
              USER.Usersurname = (snapshot.val() && snapshot.val().surname) || 'Anonymous';
              USER.Userage = (snapshot.val() && snapshot.val().age) || 'Anonymous';
              USER.Usergender = (snapshot.val() && snapshot.val().gender) || 'Anonymous';
              USER.image=(snapshot.val() && snapshot.val().profilePhoto);
                setUser(USER);
            }); 
      navigation.navigate("DeleteTravel");
    }




    function listele(){
      
      var user = firebase.auth().currentUser;
      var currentTravels=[];
      var oldTravels=[];
      var oldResult=[];
      var currentResult=[];
      var itemValue = {Id:'',role:'',statu:''};
      var travels={creater:'',date:'',dropOffLatitude:'',dropOffLongitude:'',female:'',male:'',
        people:'',person:'',pickUpLatitude:'',pickUpLongitude:'',statu:'',Id:'',startPlace:'',endPlace:'',name:'',surname:'',photo:''};

      var travels2={creater:'',date:'',dropOffLatitude:'',dropOffLongitude:'',female:'',male:'',
        people:'',person:'',pickUpLatitude:'',pickUpLongitude:'',statu:'',Id:'',startPlace:'',endPlace:'',name:'',surname:'',photo:''};
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
                    name : (get.val() && get.val().name),
                    surname : (get.val() && get.val().surname),
                    photo : (get.val() && get.val().profilePhoto),
                    
                    
                  });
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
                    name : (get.val() && get.val().name),
                    surname : (get.val() && get.val().surname),
                    photo : (get.val() && get.val().profilePhoto),
                    
                    
                  });
                });

                
  

             }); 
            }
          });
          setCurrentTravel(currentResult);
          setOldTravel(oldResult);
      });
      setListe(true);
    
    }


    return(
      <SafeAreaView>
      <HeaderComponent logo={logo}/>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >  
        <View >
          <TouchableOpacity onPress={()=>listele()}>
                <Text style={[Profilstyles.text, { color: "black", fontSize: 30,fontWeight:"bold",alignSelf:"center",marginBottom:"1%" }]}>Get Travels</Text>
              </TouchableOpacity>   
          {!liste &&
              <Text style ={{marginTop:"7%",color:"#000",fontSize:18,fontWeight:"bold", fontStyle: "italic",alignItems:"center",alignSelf:"center"}}>
                              Sonuçlar gözükmüyorsa sayfayı aşağı çekerek yenileyin.
              </Text>
          }
          
          <View >
            <View style ={{alignItems:"center"}}>
            <Text style={[Profilstyles.text, { color: "#AEB5BC", fontSize: 18,alignSelf:"center",marginBottom:"1%" }]}>Current Travels</Text>
            </View>
            
             
          {liste &&
          
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
                    }
      
                    />
          }
          </View>


          <View style={{marginTop:30}}>
          <View style ={{alignItems:"center",fontSize:"bold"}}>
          <Text style={[Profilstyles.text, { color: "#AEB5BC", fontSize: 18,alignSelf:"center",marginBottom:"1%" }]}>
              Old Travels
              </Text>
          </View>
          {liste &&
          
          <List
          dataArray={oldTravel}
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
            }

            />
            }         
            </View>
        </View>
        </ScrollView>
            </SafeAreaView>
    ) 
  }


  function deleteTravelPage({navigation}){
    useStatusBar('light-content');
    

  function deleteTravel(){
      var user = firebase.auth().currentUser;
      firebase.database().ref('Travels/'+ selectedItem.Id+"/Passengers/"+user.uid).remove();
      firebase.database().ref('Users/'+user.uid+'/Travels/'+selectedItem.Id ).remove();
      navigation.navigate("Search");
  }

  return(
      <SafeAreaView style={Profilstyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
          <View style={Profilstyles.titleBar}>
            <View style={Profilstyles.titleBar}>
              <View style={Profilstyles.profileImage}>
                  <Image source={{uri:userstate.image}} style={Profilstyles.image} resizeMode="center"></Image>                                     
              </View>
              <Text style={[Profilstyles.text, {marginTop:"3%" ,fontWeight: "300", fontSize: 30,flexDirection: "column"}]}>{userstate.Username+' '+userstate.Usersurname}</Text>
            </View>
              <IconButton style = {{marginTop:"3%"}}iconName="keyboard-backspace" color="black" size={30} onPress={() => navigation.navigate('TravelPage')}/>                          
          </View>
               <View style={{marginLeft:"5%"}}>
                  <Text style={[Profilstyles.text, { color: "#AEB5BC", fontSize: 18  }]}>{('Age: ')+userstate.Userage }</Text>
                  <Text style={[Profilstyles.text, { color: "#AEB5BC", fontSize: 18 }]}>{('Gender: ')+userstate.Usergender}</Text>
              </View>
          <View style={mapStyle.statsContainer}>
              <View style={Profilstyles.statsBox}>
                  <Text style={[Profilstyles.text, { fontSize: 24 }]}>2</Text>
                  <Text style={[Profilstyles.text, Profilstyles.subText]}>Travel</Text>
              </View>
              <View style={Profilstyles.statsBox}>
                  <Star  style={mapStyle.starStyle} score={5} />
                  <Text style={[Profilstyles.text, Profilstyles.subText]}>Companion Score</Text>
              </View>
          </View>

          <View style={mapStyle.viewContainer2}>
             
              <MapView
                  provider={MapView.PROVIDER_GOOGLE}
                  style ={mapStyle.map}
                  showsUserLocation={true}
                  region ={region}
              >
                   <MapView.Marker
                  coordinate={{latitude:selectedItem.pickUpLatitude, longitude:selectedItem.pickUpLongitude}}
                      pinColor = "blue"
                  />
                  <MapView.Marker
                  coordinate={{latitude:selectedItem.dropOffLatitude, longitude:selectedItem.dropOffLongitude}}
                      pinColor = "red"
                  />
              
              <MapViewDirections
                  origin={{latitude:selectedItem.pickUpLatitude, longitude:selectedItem.pickUpLongitude}}
                  destination={{latitude:selectedItem.dropOffLatitude, longitude:selectedItem.dropOffLongitude}}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={5}
                  strokeColor={"#669df6"}
                  strokeOpacity= {5.0}
                  strokeWeight= {5}
              />
              </MapView>
              
              <View>
                  <TouchableOpacity style={mapStyle.buttonDelete2} onPress={()=> deleteTravel()}>
                      <Text style={{color:"#FFF",padding:"5%"}}>Delete</Text>
                  </TouchableOpacity>
                 
              </View>
              
              
              
          </View>
      </ScrollView>
  </SafeAreaView>
  )
  }


    return (
      
      
    <ProfilStack.Navigator options={{headerShown: false}} screenOptions={{headerShown: false}}>
        <ProfilStack.Screen name="TravelPage" component={TravelPage}/>
        <ProfilStack.Screen name="DeleteTravel" component={deleteTravelPage}/>
    </ProfilStack.Navigator>
    );
  }