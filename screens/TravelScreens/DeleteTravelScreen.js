import  React,{useEffect, useState} from 'react';
import { Text, View, SafeAreaView, Image, ScrollView,StatusBar,TouchableOpacity,} from "react-native";
import IconButton from '../../components/IconButton';
import Star from 'react-native-star-view';
import Profilstyles from "../Styles/ProfileScreenStyles";
import firebase from 'firebase';
const GOOGLE_MAPS_APIKEY = 'AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI';
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import mapStyle from "../Styles/mapStyle";
import HeaderComponent from "../../components/Header";

const logo = require('../../assets/logo.png');

export default function TravelStackPage({route,navigation}) {
    const [userstate,setUser] = useState({});
    const [starScore,setScor] = useState();
    const selectedItem = route.params.Item
    const region = route.params.Region
    const activeUid=firebase.auth().currentUser.uid
  
     useEffect(()=>{
        var user ={email:'',Username:'',Usersurname:'',Userage:'', Usergender:'', image:'',travel:0,starPoint:0};
        var Score=0.0;            
        firebase.database().ref('Users/'+selectedItem.creater+'/ProfileInformation').once('value', function (snapshot) {
            user.Username = (snapshot.val() && snapshot.val().name);
            user.Usersurname = (snapshot.val() && snapshot.val().surname);
            user.Userage = (snapshot.val() && snapshot.val().age);
            user.Usergender = (snapshot.val() && snapshot.val().gender);
            user.image=(snapshot.val() && snapshot.val().profilePhoto);
            user.travel=(snapshot.val() && snapshot.val().travel);
            user.starPoint=(snapshot.val() && snapshot.val().starPoint);
            setUser(user);          
        })
        if(userstate.travel==0){
            Score=0;
        }
        else{
            Score=userstate.starPoint/userstate.travel
        }
        setScor(Score);
     })

  function deleteTravel(){
      firebase.database().ref('Travels/'+ selectedItem.Id).remove();
      firebase.database().ref('Users/'+activeUid+'/Travels/'+selectedItem.Id ).remove();
      //yolcudan da sil
      navigation.navigate("TravelPage");
  }
  function leaveTravel(){
    firebase.database().ref('Travels/'+ selectedItem.Id+"/Passengers/"+activeUid).remove();
    firebase.database().ref('Users/'+activeUid+'/Travels/'+selectedItem.Id ).remove();
    navigation.navigate("TravelPage");
}
  return(
        <SafeAreaView style={Profilstyles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black"/>
        <HeaderComponent logo={logo}/>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Profilstyles.titleBar}>
                <View style={Profilstyles.titleBar}>
                <View style={Profilstyles.profileImage}>
                    <Image source={{uri:userstate.image}} style={Profilstyles.image} resizeMode="center"></Image>                                     
                </View>
                <Text style={[Profilstyles.text, {marginTop:"3%" ,fontWeight: "300", fontSize: 30,flexDirection: "column"}]}>{userstate.Username+' '+userstate.Usersurname}</Text>
                </View>
                <IconButton style = {{marginTop:"3%"}}iconName="keyboard-backspace" color="black" size={30} onPress={() => navigation.goBack()}/>                          
            </View>
                <View style={{marginLeft:"5%"}}>
                    <Text style={[Profilstyles.text, { color: "#AEB5BC", fontSize: 18  }]}>{('Age: ')+userstate.Userage }</Text>
                    <Text style={[Profilstyles.text, { color: "#AEB5BC", fontSize: 18 }]}>{('Gender: ')+userstate.Usergender}</Text>
                </View>
            <View style={mapStyle.statsContainer}>
                <View style={Profilstyles.statsBox}>
                    <Text style={[Profilstyles.text, { fontSize: 24 }]}>{userstate.travel}</Text>
                    <Text style={[Profilstyles.text, Profilstyles.subText]}></Text>
                    <Text style={[Profilstyles.text, Profilstyles.subText]}>Travel</Text>
                </View>
                <View style={Profilstyles.statsBox}>
                    <Star  style={mapStyle.starStyle} score={starScore} />
                    <Text style={[Profilstyles.text, Profilstyles.subText]}>{starScore}</Text>
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
                
                {selectedItem.creater==activeUid &&
                <View>
                    <TouchableOpacity style={mapStyle.buttonDelete2} onPress={()=> deleteTravel()}>
                        <Text style={{color:"#FFF",padding:"5%"}}>Delete</Text>
                    </TouchableOpacity>      
                </View>
                }
                {selectedItem.creater!=activeUid &&
                <View>
                    <TouchableOpacity style={mapStyle.buttonDelete2} onPress={()=> leaveTravel()}>
                        <Text style={{color:"#FFF",padding:"5%"}}>Leave</Text>
                    </TouchableOpacity>      
                </View>
                }          
            </View>
        </ScrollView>
    </SafeAreaView>
    )
  }