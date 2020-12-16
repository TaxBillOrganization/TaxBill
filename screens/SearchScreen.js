import React,{useState} from "react";
import {Text,Button,ScrollView} from "react-native";
import styles from "./Styles/searchScreenStyles";
import {View,InputGroup,Input,} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import {List,ListItem, Left, Body} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from 'axios';
import firebase from 'firebase';

export const SearchBox = ({}) =>{

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
  people:'',person:'',pickUpLatitude:'',pickUpLongitude:'',statu:'',Id:'',
};
  var dataArray=[];
  function handleSelectedAddress(placeId){
    axios
    .request({
      method: 'post',
      url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI`,
    })
    .then((results)=>{
        if(isSelected=="pickUp"){
          setpickUpSelected(results.data.result.geometry.location);
        }else if(isSelected=="dropOff"){
          setDropOffSelected(results.data.result.geometry.location);
        }
    })
    .catch((e) => {
        console.log(e.response);
      });
      setSelected(null);

     
    
      firebase.database().ref('Travels/').once('value',function (items) {

        items.forEach(function(snapshot)
          {
          travels.creater = (snapshot.val() && snapshot.val().creater) || 'Anonymous';
          travels.date = (snapshot.val() && snapshot.val().date) || 'Anonymous';
          travels.dropOffLatitude = (snapshot.val() && snapshot.val().dropOffLatitude) || 'Anonymous';
          travels.dropOffLongitude = (snapshot.val() && snapshot.val().dropOffLongitude) || 'Anonymous';
          travels.female = (snapshot.val() && snapshot.val().female) || 'Anonymous';
          travels.male = (snapshot.val() && snapshot.val().male) || 'Anonymous';
          travels.people = (snapshot.val() && snapshot.val().people) || 'Anonymous';
          travels.person = (snapshot.val() && snapshot.val().person) || 'Anonymous';
          travels.pickUpLatitude = (snapshot.val() && snapshot.val().pickUppLatitude) || 'Anonymous';
          travels.pickUpLongitude = (snapshot.val() && snapshot.val().pickUppLongitude) || 'Anonymous';
          travels.statu = (snapshot.val() && snapshot.val().statu) || 'Anonymous';
          travels.Id = (snapshot.val() && snapshot.val().Id) || 'Anonymous';
          dataArray.push(travels);
        });
        
        
    });
    setaddressResult(dataArray);
    

  }

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const [resultList,setResultList] = useState();
    const [isSelected,setSelected] = useState(null);
    const [places,setPlaces] = useState(null);
    const [pickUpSelected,setpickUpSelected] = useState(null);
    const [dropOffSelected,setDropOffSelected] = useState(null);
    const [addressResult,setaddressResult] = useState([]);
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      getDate(currentDate);
      setDate(currentDate);
    };
  
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

 
        return(
          
            <View style ={styles.searchBox}>
                <View style={styles.inputWrapper}>
                    <Text style ={styles.label}>PICK UP</Text>
                    <InputGroup>
                    <Icon name="home" size={15} color="#FF5E3A"/>
                        <Input onFocus={()=>setSelected("pickUp")}  style ={styles.inputSearch} 
                        placeholder="Choose pick up location" onChangeText={(value)=>getAddressPrediction(value)}
                       />
                    </InputGroup>
                </View>
                <View style={styles.secondInputWrapper}>
                    <Text style ={styles.label}>DROP-OFF</Text>
                    <InputGroup>
                    <Icon name="send" size={15} color="#FF5E3A"/>
                        <Input onFocus={()=>setSelected("dropOff")}  style ={styles.inputSearch} 
                        placeholder="Choose drop-off location" onChangeText={(value)=>getAddressPrediction(value)}
                        />
                    </InputGroup>
                </View>
                <View >
                    <View style={styles.inputDate}>
                    <Text style ={styles.label}>Date and Time</Text>
                        <View style={{flexDirection:"row",marginVertical:"2%"}}>
                            
                            <View style={{marginTop:"2%"}}>
                                <Icon name="calendar" size={15} color="#FF5E3A" style={{paddingLeft:7}}/>
                            </View>
                            <View  style={{marginLeft:"5%"}}>
                                <Button onPress={showDatepicker} title="Date picker!" color="#FF5E3A"/>
                            </View>
                            <View  style={{marginLeft:"5%"}}>
                                <Button onPress={showTimepicker} title="Time picker!" color="#FF5E3A"/>
                            </View>
                            <View>
                            <Fontisto name="player-settings" size={30} color="#000" style={{paddingLeft:"5%"}}/>
                            </View>
                        </View>
                </View>
            </View>
            {/*yukarısı veri giriş alanları*/}
          
            {/*aşağısı sonuç gösterme alanları*/}
            { isSelected != null &&
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
            <View>
              <Button title="Listele" onPress={()=>setResultList(true)}/>
              { resultList &&
              <List
              dataArray={addressResult}
              keyExtractor={item => item.Id}
              renderRow={(item)=>
                      <View>
                      <ListItem onPress={()=>console.error("1")} button avatar >
                      <Left  >
                          <MaterialIcons  name="location-on"/>
                      </Left>
                      <Body>
                          <Text >{item.creater}</Text>
                          <Text >{item.date}</Text>
                      </Body>
                      </ListItem>
                    
                  </View>
              }

             />
            }
            </View>
            }
            
           



            </View>
        );
    
}
export default SearchBox;









function getSelectedAdress(payload){
  return(dispatch,store)=>{
      axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${payload}&key=AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI`,
      })
      .then((results)=>
            dispatch({
                type:GET_SELECTED_ADDRESS,
                payload:results.data.result.geometry.location
            })
        )
        .then(()=>{
            if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
                axios
                .request.get("//maps.googleapis.com/maps/api/distancematrix/json",{
                    origins:store().home.selectedAddress.selectedPickUp.latitude +','+store().home.selectedAddress.selectedPickUp.longitude,
                    destinations : store().home.selectedAddress.selectedDropOff.latitude +','+store().home.selectedAddress.selectedDropOff.longitude,
                  mode:"driving",
                  key:"AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI"
                  })
                  .then((error,res)=>{
                      dispatch({
                          type:GET_DISTANCE_MATRIX,
                          payload:res.body
                      });
                  })
            }
        })
      .catch((e) => {
        console.log(e.response);
      });
     
      
  }
}