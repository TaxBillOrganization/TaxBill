import React from "react";
import {View} from "react-native";
import MapView from "react-native-maps";
import styles from "./MapContainerStyles";
import SearchBox from "../SearchBox";
import SearchResult from "../SearchResults";

export const MapContainer = ({region, getInputData,toggleSearchResultModal,getAddressPrediction, resultTypes, predictions}) => {

    return(
        <View style={styles.container}>
            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style ={styles.map}
                region ={region}
            >
                <MapView.Marker
                    coordinate={region}
                    pinColor = "blue"
                />
            </MapView>
            <SearchBox getInputData={getInputData} toggleSearchResultModal={toggleSearchResultModal}
            getAddressPrediction={getAddressPrediction}
            />
            {   (resultTypes.pickUp || resultTypes.dropOff) &&
                <SearchResult predictions={predictions}/>
            }
        </View>
    );
}
export default MapContainer;