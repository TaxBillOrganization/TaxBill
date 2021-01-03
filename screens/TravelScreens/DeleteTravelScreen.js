import  React,{useState,useEffect} from 'react';
import { Text, View, SafeAreaView, Image, ScrollView,RefreshControl,TouchableOpacity ,} from "react-native";
import IconButton from '../../components/IconButton';
import Icon from "react-native-vector-icons/FontAwesome";
import { createStackNavigator } from '@react-navigation/stack';
import Star from 'react-native-star-view';
import {List,ListItem, Body,Right} from "native-base";
import styles from "../Styles/searchScreenStyles";
import Profilstyles from "../Styles/ProfileScreenStyles";
import firebase from 'firebase';
const GOOGLE_MAPS_APIKEY = 'AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI';
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import mapStyle from "../Styles/mapStyle";
import HeaderComponent from "../../components/Header";
import useStatusBar from '../../hooks/useStatusBar';

const ProfilStack = createStackNavigator();


export default function TravelStackPage() {
  useStatusBar('light-content');

  const [currentTravel,setCurrentTravel] = useState([]);
  const [oldTravel,setOldTravel] = useState([]);
  const [liste,setListe] = useState(false)
  const [selectedItem,setSelectedItem] = useState(null);
  const [userstate,setUser] = useState({});
  const [region,setRegion] = useState({});

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