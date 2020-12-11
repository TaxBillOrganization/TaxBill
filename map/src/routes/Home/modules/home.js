import update from "react-addons-update";
import constants from "./actionConstants";
import {Dimensions} from "react-native";
import RNGooglePlaces from "react-native-google-places";
import axios from 'axios';

import Request from "../../../../util/request";

//import { func } from "prop-types";
//-------------------
//Constants
//------------------
const { 
    GET_CURRENT_LOCATION,
    GET_INPUT,
    TOGGLE_SEARCH_RESULT,
    GET_ADDRESS_PREDICTIONS,
    GET_SELECTED_ADDRESS,
    GET_DISTANCE_MATRIX,
    SAVE_TRACK,
 } = constants;

const {width, height} = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;

const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;


//-------------------
//Actions
//------------------

export function getCurrentLocation(){
    return (dispatch)=>{
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                dispatch({
                    type:GET_CURRENT_LOCATION,
                    payload:position
                });
            },
            (error)=> console.log(error.message),
            {enableHighAccuracy:true,timeout:20000,maximumAge:1000}
        );
    }
}

//USER INPUT
export function getInputData(payload){
    return {
        type:GET_INPUT,
        payload
    }
}

//GET_ADDRESS FROM GOOGLE PLACE
searchLocation = async (text) => {
    //this.setState({searchKeyword: text});
    
  };
export function getAddressPrediction(){
    return(dispatch,store)=>{
        let userInput = store().home.resultTypes.pickUp ? store().home.inputData.pickUp : store().home.inputData.dropOff;
        
        axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI&input=${userInput}`,
      })
      .then((results)=>
			dispatch({
				type:GET_ADDRESS_PREDICTIONS,
				payload:results.data.predictions
			})
		)
      .catch((e) => {
        console.log(e.response);
      });
     

     /*   RNGooglePlaces.getAutocompletePredictions(userInput,{
                country:"TR"
                
                 }
            )
            .then((place) => {
            console.log("!");
            })
            .catch(error => console.log(error.message)); */
            
    };
}

//Selected Address
export function getSelectedAdress(payload){
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


//search results 
export function toggleSearchResultModal(payload){
    return {
        type:TOGGLE_SEARCH_RESULT,
        payload
    }
}


//-------------------
//Action Handlers
//------------------

function handleGetDistanceMatrix(state,action){
    return update(state,{
        distanceMatrix:{
            $set:action.payload
        }
    });
}


function handleGetCurrentLocation(state,action){
    return update(state,{
        region:{
            latitude:{
                $set:action.payload.coords.latitude
            },
            longitude:{
                $set:action.payload.coords.longitude
            },
            latitudeDelta: {
                $set:LATITUDE_DELTA
            },
            longitudeDelta: {
                $set:LONGITUDE_DELTA
            }

        }
    })
}

function handleGetInputData(state,action){
    const { key,value } = action.payload;
    return update(state,{
        inputData:{
            [key]:{
                $set:value
            }
        }
        
    });
}

function handleToggleSearchResult(state,action){

    if(action.payload ==="pickUp"){
        return update(state,{
            resultTypes: {
                pickUp:{
                    $set:true,
                },
                dropOff:{
                    $set:false,
                }
            },
            predictions:{
                $set:{}
            }
        });
    }
    if(action.payload ==="dropOff"){
        return update(state,{
            resultTypes: {
                pickUp:{
                    $set:false,
                },
                dropOff:{
                    $set:true,
                }
            },
            predictions:{
                $set:{}
            }
        });
    }
}

function handleGetAddressPredictions(state,action){
    return update(state,{
        predictions:{
            $set:action.payload
        }
    });
}

function handleGetSelectedAddress(state,action){
    let selectedTitle = state.resultTypes.pickUp ? "selectedPickUp" : "selectedDropOff"
	return update(state, {
		selectedAddress:{
			[selectedTitle]:{
                $set:action.payload
                
            },
            
		},
		resultTypes:{
			pickUp:{
				$set:false
			},
			dropOff:{
				$set:false
			}
		}
	})
}
export function saveTrack(payload){
    
    var dropOffLat = payload.selectedDropOff.lat;
    var pickUppLat = payload.selectedPickUp.lat;

    var dropOffLng = payload.selectedDropOff.lng;
    var pickUppLng = payload.selectedPickUp.lng;

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

console.log(midX+"*"+midY+"*"+deltaLat+"*"+deltaLng);
return ({
    type: SAVE_TRACK,
    payload:{
        middleX:midX,
        middleY:midY,
        deltaLatitude:deltaLat+0.5,
        deltaLongitude:deltaLng+0.1
    }
    }
);
}

function handeleSaveTrack(state,action){
    return update(state,{
        region:{
            latitude:{
                $set:action.payload.middleX
            },
            longitude:{
                $set:action.payload.middleY
            },
            latitudeDelta: {
                $set:action.payload.deltaLatitude
            },
            longitudeDelta: {
                $set:action.payload.deltaLongitude
            }

        }
    })
}

const ACTION_HANDLER = {
    GET_CURRENT_LOCATION:handleGetCurrentLocation,
    GET_INPUT:handleGetInputData,
    TOGGLE_SEARCH_RESULT:handleToggleSearchResult,
    GET_ADDRESS_PREDICTIONS:handleGetAddressPredictions,
    GET_SELECTED_ADDRESS:handleGetSelectedAddress,
    GET_DISTANCE_MATRIX : handleGetDistanceMatrix,
    SAVE_TRACK:handeleSaveTrack,
}
const initialState = {
    region:{},
    inputData:{},
    resultTypes:{},
    selectedAddress:{},
};

export function HomeReducer(state = initialState,action){

    const handler = ACTION_HANDLER[action.type];

    return handler ? handler(state,action) : state;
}
