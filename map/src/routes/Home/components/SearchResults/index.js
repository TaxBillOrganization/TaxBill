import React from "react";
import {Text} from "react-native";
import styles from "./SearchResultStyles";
import {View,List,ListItem, Left, Body} from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";

export const SearchResult = ({predictions,getSelectedAdress}) => {

    function handleSelectedAddress(placeID){
        getSelectedAdress(placeID);
    }
  
 
        return(
           
            <View style ={styles.searchResultsWrapper}>
                
               <List
                dataArray={predictions}
                keyExtractor={item => item.place_id}
                renderRow={(item)=>
                        <View>
                            
                        <ListItem onPress={()=>handleSelectedAddress(item.place_id)} button avatar >
                        <Left  style ={styles.leftContainer}>
                            <Icon style ={styles.leftIcon} name="location-on"/>
                        </Left>
                        <Body>
                            <Text style={styles.primaryText}>{item.structured_formatting.main_text}</Text>
                            <Text style={styles.secondaryText}>{item.structured_formatting.secondary_text}</Text>
                        </Body>
                        </ListItem>
                       
                    </View>
                }

               />
            
            </View>
        
        );
    
}
export default SearchResult;