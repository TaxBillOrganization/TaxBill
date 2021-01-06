import React from "react";
import {View,StatusBar,Text} from "react-native";
import MapView from "react-native-maps";
import styles from "./MapContainerStyles";
import SearchBox from "../SearchBox";
import SearchResult from "../SearchResults";
import MapViewDirections from 'react-native-maps-directions';
import InfoButton from "../saveButton";
import SettingBox from "../options";
import OptionsBox from "../options/optionsItems";
import DateTime from "../Date/index";

export const MapContainer = ({region, date, getInputData,toggleSearchResultModal,getAddressPrediction,
     resultTypes, predictions, getSelectedAdress, selectedAddress, saveTrack,settings,openSettings,getSettings,
     setSettings, getDate,startEndAddress,startEnd,startEndPoint}) => {
     
        const { selectedPickUp, selectedDropOff } = selectedAddress || {};
        const GOOGLE_MAPS_APIKEY = 'AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI';


    return(
        
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black"/>
            
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
            getAddressPrediction={getAddressPrediction} selectedAddress = {selectedAddress}  startEndAddress={startEndAddress}
            startEndPoint={startEndPoint}
            />
            <DateTime  settings={settings} getDate={getDate} />
            {   (resultTypes.pickUp || resultTypes.dropOff) &&
            
                <SearchResult predictions={predictions} getSelectedAdress={getSelectedAdress}/>
                
            }

            {   (resultTypes.pickUp || resultTypes.dropOff) &&
            
            <SearchResult predictions={predictions} getSelectedAdress={getSelectedAdress} startEnd={startEnd}/>
            
            }
            
            {    (selectedDropOff && selectedPickUp && date) &&
                
                <InfoButton selectedAddress={selectedAddress} 
                saveTrack={saveTrack}
                date={date}
                settings={settings}
                styles={{top:600}}/>
                
            
            
            }
            {(!resultTypes.pickUp && !resultTypes.dropOff) &&
            <SettingBox settings={settings} openSettings={openSettings} getSettings={getSettings}
                setSettings={setSettings}
            />
            }
            {(!resultTypes.pickUp && !resultTypes.dropOff) &&
            <OptionsBox settings={settings} openSettings={openSettings} getSettings={getSettings}
                setSettings={setSettings}
            />
            }
        </View>
        
    );
}
export default MapContainer;