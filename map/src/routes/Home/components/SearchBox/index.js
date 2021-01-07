import React,{useState, useEffect} from "react";
import {Text,StatusBar} from "react-native";
import styles from "./SearchBoxStyles";
import {View,InputGroup,Input} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";


export const SearchBox = ({getInputData, toggleSearchResultModal, getAddressPrediction, selectedAddress,startEnd,startEndPoint}) =>{
    const {selectedPickUp,selectedDropOff } = selectedAddress || {};
    const [startPointTitle,setStartPoint]=useState();
    const [endPointTitle,setEndPoint]=useState();



    function handleInput(key,val){
        getInputData({
            key,
            value:val
        });
        getAddressPrediction();
    }

 
        return(
            <View style ={styles.searchBox}>
                <StatusBar barStyle="light-content" backgroundColor="black"/>
                <View style={styles.inputWrapper}>
                    <Text style ={styles.label}>PICK UP</Text>
                    <InputGroup>
                    <Icon name="home" size={15} color="#FF5E3A"/>
                        <Input onFocus={()=>{toggleSearchResultModal("pickUp"),setStartPoint(null)}} 
                         style ={styles.inputSearch} 
                        placeholder="Choose pick up location" onChangeText={handleInput.bind(this,"pickUp")}
                        value={startEndPoint.pickUp}
                       />
                    </InputGroup>
                </View>
                <View style={styles.secondInputWrapper}>
                    <Text style ={styles.label}>DROP-OFF</Text>
                    <InputGroup>
                    <Icon name="send" size={15} color="#FF5E3A"/>
                        <Input onFocus={()=>{toggleSearchResultModal("dropOff"),setEndPoint(null)}}  style ={styles.inputSearch} 
                        placeholder="Choose drop-off location" onChangeText={handleInput.bind(this,"dropOff")}
                        value={startEndPoint.dropOff}
                        />
                    </InputGroup>
                </View>
            </View>
        );
    
}
export default SearchBox;