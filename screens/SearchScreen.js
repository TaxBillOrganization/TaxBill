import  React,{useEffect, useState} from 'react';
import { Text, View, SafeAreaView, Image, ScrollView,Alert,RefreshControl,TouchableOpacity,StyleSheet } from "react-native";
import IconButton from '../components/IconButton';
import Icon from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import AppButton from "../components/commentButton"
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Star from 'react-native-star-view';
import axios from 'axios';
import {InputGroup,Input,List,ListItem, Left, Body, Right} from "native-base";
import styles from "./Styles/searchScreenStyles";
import Profilstyles from "./Styles/ProfileScreenStyles";
import firebase from 'firebase';
const GOOGLE_MAPS_APIKEY = 'AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI';
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import mapStyle from "./Styles/mapStyle";
const ProfilStack = createStackNavigator();
import ChatRoom from './ChatScreens/ChatRoom';
import Messages from './ChatScreens/Messages';
import HeaderComponent from "../components/Header";
import useStatusBar from '../hooks/useStatusBar';
import { creatRoom } from '../components/Firebase/firebase';
const logo = require('../assets/logo.png');

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

export default function SearchStackPage() {
    useStatusBar('light-content');
    const [selectedItem,setSelectedItem] = useState(null);
    const [userstate,setUser] = useState({});
    const [activeUser,setActiveUser] = useState({});
    const [region,setRegion] = useState({});
    const [isAvailable,setAvailable] = useState();
    const uid = firebase.auth().currentUser.uid



    function JoinTravelPage({navigation}){
      useStatusBar('light-content');


        function creatChatRoom(){
          creatRoom(uid,activeUser.Username,activeUser.Usersurname,activeUser.Userphoto,
            selectedItem.creater,selectedItem.createrName,selectedItem.createrSurname,selectedItem.createrPhoto);
            navigation.navigate("ChatRoom")
        }
        function saveTravel(){
            var user = firebase.auth().currentUser;
            var passengerCount;
            var isPerson;
            var status ="c"
            firebase.database().ref('Travels/'+ selectedItem.Id).on('value',function (snapshot) {
                passengerCount = snapshot.val().passenger;
                if(snapshot.val().person && !snapshot.val().people){
                    status="f";
                }else if(snapshot.val().people && passengerCount+1 == 3){
                    status="f";
                }
            });
            passengerCount++;
            firebase.database().ref('Travels/'+ selectedItem.Id).update({
                passenger:passengerCount,
                statu:status,
             });
             ///////////
            firebase.database().ref('Travels/'+ selectedItem.Id+"/Passengers" ).update({
               [user.uid]:"c",
                
            });
            firebase.database().ref('Users/'+user.uid+'/Travels/'+selectedItem.Id ).set({
                Id:[selectedItem.Id],
                statu:"c",
                role:"p",
            });
            navigation.navigate("Search");
        }


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
                    <IconButton style = {{marginTop:"3%"}}iconName="keyboard-backspace" color="black" size={30} onPress={() => navigation.navigate('Search')}/>                          
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
                    {isAvailable &&
                    <View>
                        <TouchableOpacity style={mapStyle.buttonDelete2} onPress={()=> deleteTravel()}>
                            <Text style={{color:"#FFF",padding:"5%"}}>Delete</Text>
                        </TouchableOpacity>
                        {alert("You have already been join.If you want to delete travel, please press the delete button")}
                    </View>
                    }
                    {!isAvailable &&
                    <TouchableOpacity style={mapStyle.buttonSave2} onPress={()=> saveTravel()}>
                        <Text style={{color:"#FFF",padding:"5%"}}>Join</Text>
                    </TouchableOpacity>
                    }
                    {!isAvailable &&
                    <TouchableOpacity style={mapStyle.buttonIgnore2} onPress={()=>creatChatRoom()}>
                        <Text style={{color:"#FFF",padding:"5%"}}>Send Message</Text>
                    </TouchableOpacity>
                    }
                    
                </View>
            </ScrollView>
        </SafeAreaView>
        )
    }


      function SearchBox({navigation}){
        useStatusBar('light-content');
        const [point,setPoint] = useState();
        const [resultList,setResultList] = useState(false);
        const [isSelected,setSelected] = useState();
        const [places,setPlaces] = useState();
        const [pickUpSelected,setpickUpSelected] = useState({}); 
        const [dropOffSelected,setDropOffSelected] = useState({});
        const [addressResult,setaddressResult] = useState([]);
        const [startPointTitle,setStartPoint] = useState();
        const [endPointTitle,setEndPoint] = useState();
        
        function getAddressPrediction(userInput){
              axios
            .request({
              method: 'post',
              url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI&input=${userInput}`,
            })
            .then((results)=>{
                setPlaces(results.data.predictions)
            }
          ).catch((e) => {
              console.log(e.response);
            });
      
        }
      
        var travels={creater:'',date:'',dropOffLatitude:'',dropOffLongitude:'',female:'',male:'',
        people:'',person:'',pickUpLatitude:'',pickUpLongitude:'',statu:'',Id:'',startPlace:'',endPlace:'',
        createrName:'',createrSurname:'',createrPhoto:''};
      
        
      function getAddress(placeId){
       
        var place='';
        axios
        .request({
          method: 'post',
          url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI`,
        })
        .then((result)=>{
          
          place = result.data.result.formatted_address
          setPoint(place);
        })
        .catch((e) => {
            console.log(e.response);
          });
          //console.error("1"+JSON.stringify(point));
          
      }
      
      
      
      
        function handleSelectedAddress(placeId){
          
          var secilen={location:{},placeId:''};
          axios
          .request({
            method: 'post',
            url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI`,
          })
          .then((results)=>{
            if(isSelected == "pickUp"){
              secilen.location=results.data.result.geometry.location;
              secilen.placeId = placeId;
              setpickUpSelected(secilen);
              setStartPoint(results.data.result.formatted_address);
              
            }else if(isSelected == "dropOff"){
              secilen.location=results.data.result.geometry.location;
              secilen.placeId = placeId;
              setDropOffSelected(secilen);
              setEndPoint(results.data.result.formatted_address);
            }
          })
          .catch((e) => {
              console.log(e.response);
            });
            
            setSelected(null);
        }
      
        function listele(start,end,male,female,person,people){
          var dataArray=[];
      
          if(!male && !female && !person && !people){
            alert("Please select setting");
          }else{
            
            //console.error("geldi");
            travels = {creater:'',date:'',dropOffLatitude:'',dropOffLongitude:'',female:'',male:'',
            people:'',person:'',pickUpLatitude:'',pickUpLongitude:'',statu:'',Id:'',startPlace:'',endPlace:'',
            createrName:'',createrSurname:'',createrPhoto:''};
            var ItemArray=[];
            firebase.database().ref('Travels').on('value',function (items) {
              items.forEach(function(snap){
                ItemArray.push(snap.val());
              });
            })
              //var arrayItems = ItemArray;
              //console.error(JSON.stringify(ItemArray));
              //console.error(JSON.stringify(ItemArray[0]));
              ItemArray.forEach(function(snapshot)
                {
                  
                  if(snapshot.statu == "c"){
                    //defineGender
                    var creatorGender='';
                    
                    
                    
                    firebase.database().ref('Users/'+snapshot.creater+'/ProfileInformation').once('value',function (userList) {
                    
                      creatorGender = userList.gender;
                    });
                    
                    if((female && male) || (female && creatorGender=='Female')
                    || (male && creatorGender=='Male')){  
                     
                        var currentUser = firebase.auth().currentUser;
                        var passengerGender='';
                        firebase.database().ref('Users/'+currentUser.uid+'/ProfileInformation').once('value',function (userList) {
                          passengerGender = userList.gender;
                        });
      
                        if((snapshot.female && snapshot.male) || (snapshot.female && passengerGender =='Female') ||
                        (snapshot.val().male && passengerGender =='Male')) {
                        
                          if((person == snapshot.person) && (snapshot.people == people)){ //Kişi sayısı
                             
                                
                            axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
                              params: {
                                origins: start.location.lat +','+start.location.lng,
                                destinations : snapshot.pickUppLatidute +','+snapshot.pickUppLongitude,
                                mode:"driving",
                                key:"AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI"
                              }
                            })
                            .then( (baslangicUzaklik)=> {
                              
                              axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
                                params: {
                                  origins: end.location.lat +','+end.location.lng,
                                  destinations : snapshot.dropOffLatidute +','+snapshot.dropOffLongitude,
                                  mode:"driving",
                                  key:"AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI"
                                }
                              })
                              
                              .then( (bitisUzaklik) =>{
  
                                if(baslangicUzaklik.data.rows[0].elements[0].distance.value < 1000 && bitisUzaklik.data.rows[0].elements[0].distance.value < 1000){
                                  
                                  firebase.database().ref('Users/'+ snapshot.creater +'/ProfileInformation').once('value',function (get) {
                                    dataArray.push({
                                    
                                      creater : (snapshot && snapshot.creater) || 'Anonymous',                   
                                      date : (snapshot && snapshot.date) || 'Anonymous',
                                      dropOffLatitude : (snapshot && snapshot.dropOffLatidute) || 'Anonymous',
                                      dropOffLongitude : (snapshot && snapshot.dropOffLongitude) || 'Anonymous',
                                      female : (snapshot && snapshot.female) || 'Anonymous',
                                      male : (snapshot && snapshot.male) || 'Anonymous',
                                      people : (snapshot && snapshot.people) || 'Anonymous',
                                      person : (snapshot && snapshot.person) || 'Anonymous',
                                      pickUpLatitude : (snapshot && snapshot.pickUppLatidute) || 'Anonymous',
                                      pickUpLongitude : (snapshot && snapshot.pickUppLongitude) || 'Anonymous',
                                      statu : (snapshot && snapshot.statu) || 'Anonymous',
                                      Id : (snapshot && snapshot.Id) || 'Anonymous',
                                      startPlace : (snapshot && snapshot.startPointId) || 'Anonymous',
                                      endPlace : (snapshot && snapshot.endPointId) || 'Anonymous',
                                      createrName : (get.val() && get.val().name),
                                      createrSurname : (get.val() && get.val().surname),
                                      createrPhoto : (get.val() && get.val().profilePhoto),
                                      });
                                     // console.error(JSON.stringify((get.val() && get.val().surname)));
                                  });
                                  
                              }else{
                                 
                                  var m1 =( (end.location.lng - start.location.lng)/(end.location.lat - start.location.lat));
                                  var m2 = (snapshot.dropOffLongitude - snapshot.pickUppLongitude)/(snapshot.dropOffLatidute - snapshot.pickUppLatidute);
                                 
                                  var m = m1 / m2;
                                  if(((m > -1.2 && m < 1.2) && baslangicUzaklik.data.rows[0].elements[0].distance.value < 1000 ) ||
                                  ((m > -1.2 && m < 1.2) && (bitisUzaklik.data.rows[0].elements[0].distance.value < 1000))){
                                   
                                  
                                  

                                    firebase.database().ref('Users/'+ snapshot.creater +'/ProfileInformation').once('value',function (get) {
                                      dataArray.push({
                                      
                                        creater : (snapshot && snapshot.creater) || 'Anonymous',                   
                                        date : (snapshot && snapshot.date) || 'Anonymous',
                                        dropOffLatitude : (snapshot && snapshot.dropOffLatidute) || 'Anonymous',
                                        dropOffLongitude : (snapshot && snapshot.dropOffLongitude) || 'Anonymous',
                                        female : (snapshot && snapshot.female) || 'Anonymous',
                                        male : (snapshot && snapshot.male) || 'Anonymous',
                                        people : (snapshot && snapshot.people) || 'Anonymous',
                                        person : (snapshot && snapshot.person) || 'Anonymous',
                                        pickUpLatitude : (snapshot && snapshot.pickUppLatidute) || 'Anonymous',
                                        pickUpLongitude : (snapshot && snapshot.pickUppLongitude) || 'Anonymous',
                                        statu : (snapshot && snapshot.statu) || 'Anonymous',
                                        Id : (snapshot && snapshot.Id) || 'Anonymous',
                                        startPlace : (snapshot && snapshot.startPointId) || 'Anonymous',
                                        endPlace : (snapshot && snapshot.endPointId) || 'Anonymous',
                                        createrName : (get.val() && get.val().name),
                                        createrSurname : (get.val() && get.val().surname),
                                        createrPhoto : (get.val() && get.val().profilePhoto),
                                        });
                                    });
                                  //console.error("23------"+JSON.stringify(travels))
                                  
                                    
                                  }
                                  
                              }
  
                              });
                                
                            }); 
                               
                          }
                          
                        }
                    }
      
                }
              
              });
              
            
            
          }
          //console.error("/***"+JSON.stringify(dataArray)+"***/");
          setaddressResult(dataArray);
          setResultList(true);
        }
      
        function joinTravel(item){
            setSelectedItem(item);
            var user = firebase.auth().currentUser;
            var control = false;
            var passengers=[];
            firebase.database().ref('Users/'+user.uid+'/Travels/'+item.Id).once('value',function (snapshot) {
                 
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
            var activeuser ={Username:'',Usersurname:'',Userphoto:''};
            firebase.database().ref('Users/'+ uid +'/ProfileInformation').once('value',function (snapshot) {
              activeuser.Username = (snapshot.val() && snapshot.val().name);
              activeuser.Usersurname = (snapshot.val() && snapshot.val().surname);
              activeuser.Userphoto = (snapshot.val() && snapshot.val().profilePhoto);
              setActiveUser(activeuser)
          });

            var user ={email:'',Username:'',Usersurname:'',Userage:'', Usergender:'', image:''};
            firebase.database().ref('Users/'+ item.creater +'/ProfileInformation').once('value',function (snapshot) {
                user.Username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
                user.Usersurname = (snapshot.val() && snapshot.val().surname) || 'Anonymous';
                user.Userage = (snapshot.val() && snapshot.val().age) || 'Anonymous';
                user.Usergender = (snapshot.val() && snapshot.val().gender) || 'Anonymous';
                user.image=(snapshot.val() && snapshot.val().profilePhoto);
                setUser(user);
            }); 
            navigation.navigate('Join');
        }
      
          
      
          const [date, setDate] = useState(new Date());
          const [mode, setMode] = useState('date');
          const [show, setShow] = useState(false);
          
      
          const onChange = (event, selectedDate) => {
      
            const currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            getDate(currentDate);
            setDate(currentDate);
          };
      
            //setting tabs states
            const [settingTab,setSettingTab] = useState();
            const [isSelectedFemale,setFemale] = useState();
            const [isSelectedMale,setMale] = useState();
            const [isSelectedPeople,setPeople] = useState();
            const [isSelectedPerson,setPerson] = useState();
            
      
          const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);
          };
        
          const showDatepicker = () => {
            showMode('date');
          };
        
          const showTimepicker = () => {
            showMode('time');
          };
      
          const [refreshing, setRefreshing] = React.useState(false);
      
          const onRefresh = React.useCallback(() => {
            setRefreshing(true);
            wait(2000).then(() => setRefreshing(false));
          }, []);
      
              return(
            <SafeAreaView >
            <HeaderComponent logo={logo}/>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >  
                        <View style={styles.inputWrapper}>
                            <Text style ={{marginTop:"2%",color:"#000",fontSize:10, fontStyle: "italic"}}>PICK UP</Text>
                          <InputGroup>
                            <Icon name="home" size={15} color="#FF5E3A"/>
                                <Input onFocus={()=>{setSelected("pickUp"),setStartPoint(null)}}  style ={styles.inputSearch} 
                                placeholder="Choose pick up location" onChangeText={(value)=>getAddressPrediction(value)}
                                value={startPointTitle}
                                />
                            </InputGroup>
                          </View>
                          <View style={styles.secondInputWrapper}>
                            <Text style ={{marginTop:"2%",color:"#000",fontSize:10, fontStyle: "italic"}}>DROP-OFF</Text>
                            <InputGroup>
                            <Icon name="send" size={15} color="#FF5E3A"/>
                                <Input onFocus={()=>{setSelected("dropOff"),setEndPoint(null)}}  style ={styles.inputSearch} 
                                placeholder="Choose drop-off location" onChangeText={(value)=>getAddressPrediction(value)}
                                value={endPointTitle}
                                />
                            </InputGroup>
                          </View>
                          <View >
                          <View style={styles.inputDate}>
                          <Text > </Text>
                              <View style={{flexDirection:"row",justifyContent: "space-between",}}>
                                  <View style ={{alignItems:"center",paddingLeft:"2%"}}     >            
                                  <AppButton title="Search" onPress={()=> listele(pickUpSelected,dropOffSelected,isSelectedMale,
                                    isSelectedFemale,isSelectedPerson,isSelectedPeople)}/>
                                  </View>
                                  <TouchableOpacity onPress={()=>setSettingTab(!settingTab)} style={{marginRight:"2%"}}>
                                  <Fontisto name="player-settings" size={30} color="#000" style={{paddingLeft:"2%"}}/>
                                  </TouchableOpacity>
                              </View>
                          </View>
                      {/*/////////////////////////settingBox/////////////////////////////////////*/}
                       {settingTab &&
                      <View style={styles.container}>
                            <TouchableOpacity onPress={ ()=>setFemale(!isSelectedFemale)}
                            styles={styles.settingsContainer}>
                              <View style={styles.rowContainer}>
                                {!isSelectedFemale && <Icon name="square-o" style={styles.checkbox}/>}
                                {isSelectedFemale && <Icon name="check-square-o" style={styles.checkbox}/>}
                                <Text style={styles.label}>Female</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ ()=>setMale(!isSelectedMale)}
                            styles={styles.settingsContainer}>
                              <View style={styles.rowContainer}>
      
                                {!isSelectedMale && <Icon name="square-o" style={styles.checkbox}/>}
                                {isSelectedMale && <Icon name="check-square-o" style={styles.checkbox}/>}
      
                                <Text style={styles.label}>Male</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ ()=>setPerson(!isSelectedPerson)}
                            styles={styles.settingsContainer}>
                              <View style={styles.rowContainer}>
      
                                {!isSelectedPerson && <Icon name="square-o" style={styles.checkbox}/>}
                                {isSelectedPerson && <Icon name="check-square-o" style={styles.checkbox}/>}
      
                                <Text style={styles.label}>1 Person</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ ()=>setPeople(!isSelectedPeople)}
                            styles={styles.settingsContainer}>
                              <View style={styles.rowContainer}>
                                {!isSelectedPeople && <Icon name="square-o" style={styles.checkbox}/>}
                                {isSelectedPeople && <Icon name="check-square-o" style={styles.checkbox}/>}
                                <Text style={styles.label}>2-3 People</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                      }
                       {/*//////////////////////////////////////////////////////////////*/}
                  </View> 
      
      
                  {/*aşağısı sonuç gösterme alanları*/}
                  { isSelected  &&
                    <List
                    dataArray={places}
                    keyExtractor={item => item.place_id}
                    renderRow={(item)=>
                            <View>
                            <ListItem onPress={()=>handleSelectedAddress(item.place_id)} button avatar >
                            <Left  >
                                <MaterialIcons  name="location-on"/>
                            </Left>
                            <Body>
                                <Text >{item.structured_formatting.main_text}</Text>
                                <Text >{item.structured_formatting.secondary_text}</Text>
                            </Body>
                            </ListItem>
                          
                        </View>
                    }
      
                   />
                  }
                  {(pickUpSelected && dropOffSelected)&&
                  <SafeAreaView style={sty.container}>
                    
                  
      
                    { (resultList && addressResult.length == 0 ) && 
                    <Text style ={{marginTop:"7%",color:"#000",fontSize:14,fontWeight:"bold", fontStyle: "italic",alignItems:"center",alignSelf:"center"}}>
                             Sonuçlar gözükmüyorsa sayfayı aşağı çekerek yenileyin.
                    </Text>}
                    <View style={sty.container}>
                   
                    <List
                    dataArray={addressResult}
                    keyExtractor={item => item.Id}
                    renderRow={(item)=>
                          <View style={sty.container}>
                            <ListItem onPress={()=>joinTravel(item)} button avatar >
                            <Body style={{flexDirection:"column"}}>
                              <View style={{flexDirection:"row"}}>
                                <Text style={styles.text} >{item.createrName +(" ")+ item.createrSurname}</Text>
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
                            <Image source={{uri:item.createrPhoto}} style={styles.image} resizeMode="center"></Image> 
                            </Right>
                            </ListItem>  
                        </View>
                    }
      
                   />
                </View>
                  
            </SafeAreaView>
                  }
            </ScrollView>
            </SafeAreaView>
              );
          
      }

    return (    //Messages
    <ProfilStack.Navigator options={{headerShown: false}} screenOptions={{headerShown: false}}>
        <ProfilStack.Screen name="Search" component={SearchBox}/>
        <ProfilStack.Screen name="Join" component={JoinTravelPage} />
        <ProfilStack.Screen name="ChatRoom" component={ChatRoom} />
        <ProfilStack.Screen name='Messages' component={Messages}/>
    </ProfilStack.Navigator>
    );
  }

  const sty = StyleSheet.create({
    container: {
        flex:1, 
        alignSelf:'auto', 
        alignItems:"stretch",
        justifyContent:'center',
        marginBottom:"5%",
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
        width: 150,
        height: 150,
        borderRadius: 35,
        overflow: "hidden",
        alignItems:"stretch",
        justifyContent:'center',
        //alignSelf:"center"
        borderColor:"#f5f5f5",
        borderWidth :2,
        
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