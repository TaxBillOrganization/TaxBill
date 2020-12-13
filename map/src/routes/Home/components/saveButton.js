import React from "react"
import {View,Button,Dimensions, StyleSheet} from "react-native";

const windowHeight = Dimensions.get('window').height;   
const windowWidth = Dimensions.get('window').width;

export const infoSave  = ({selectedAddress,saveTrack}) => {
    
function handleSelectedAdress(selectedAddress){
     saveTrack(selectedAddress);
}

    return(
        <View style={styles.buttonContainer}>
            
            <Button title={"Create Track"} onPress={()=>handleSelectedAdress(selectedAddress)}/>
        </View>
    );
}
const styles = StyleSheet.create({
    buttonContainer:{
        top:windowHeight-200,
        position:"absolute",
        width:windowWidth/3,
        height:1000,
       right:windowWidth/10,
        opacity:0.9

    }
});

export default infoSave;