import React from "react";
import {View, SafeAreaView,Text} from "react-native";
import MapView from "react-native-maps";
import styles from "./MapContainerStyles";
import SearchBox from "../SearchBox";
import SearchResult from "../SearchResults";
import { Button } from "native-base";
import MapViewDirections from 'react-native-maps-directions';
import { ScrollView } from "react-native-gesture-handler";

export const MapContainer = ({region, getInputData,toggleSearchResultModal,getAddressPrediction,
     resultTypes, predictions, getSelectedAdress, selectedAddress}) => {
        const { selectedPickUp, selectedDropOff } = selectedAddress || {};
        const origin = {latitude:41.0224664, longitude:29.0391322};
        const destination = {latitude:40.98186700000001, longitude:29.0576302};
        const GOOGLE_MAPS_APIKEY = 'AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI';
    return(
    <View style={styles.container}>
            
            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style ={styles.map}
                showsUserLocation={true}
                region ={region}
            > 
           
            
              {
              selectedPickUp &&
                <MapView.Marker
                coordinate={{latitude:selectedAddress.selectedPickUp.lat, longitude:selectedAddress.selectedPickUp.lng}}
                    pinColor = "blue"
                />
                
            }
             {
             selectedDropOff &&
                <MapView.Marker
                coordinate={{latitude:selectedAddress.selectedDropOff.lat, longitude:selectedAddress.selectedDropOff.lng}}
                    pinColor = "red"
                />
            }
            
            { (selectedDropOff && selectedPickUp) &&
            <MapViewDirections
                origin={{latitude:selectedAddress.selectedPickUp.lat, longitude:selectedAddress.selectedPickUp.lng}}
                destination={{latitude:selectedAddress.selectedDropOff.lat, longitude:selectedAddress.selectedDropOff.lng}}
                apikey={GOOGLE_MAPS_APIKEY}
               strokeWidth={5}
                strokeColor={"#669df6"}
                strokeOpacity= {5.0}
                strokeWeight= {5}
            />

                
            }
       
        
            </MapView>
            
            <SearchBox getInputData={getInputData} toggleSearchResultModal={toggleSearchResultModal}
            getAddressPrediction={getAddressPrediction} selectedAddress = {selectedAddress}
            />
            {   (resultTypes.pickUp || resultTypes.dropOff) &&
            
                <SearchResult predictions={predictions} getSelectedAdress={getSelectedAdress}/>
                
            }
            <View  style={{      top:400,
        position:"absolute",
       
        height:1000,
        backgroundColor:"#fff",
        opacity:0.9}}>
           
        <Text>SA</Text>
        </View>
    </View>
        
    );
}
export default MapContainer;