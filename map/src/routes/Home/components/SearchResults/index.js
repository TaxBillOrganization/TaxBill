import React from "react";
import {Text} from "react-native";
import styles from "./SearchResultStyles";
import {View,List,ListItem, Left, Body} from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";

export const SearchResult = ({predictions}) => {

 
        return(
            <View style ={styles.searchResultsWrapper}>
               <List
                dataArray={predictions}
                renderRow={(item)=>
                        <View>
                        <ListItem button avatar>
                        <Left  style ={styles.leftContainer}>
                            <Icon style ={styles.leftIcon} name="location-on"/>
                        </Left>
                        <Body>
                            <Text style={styles.primaryText}>{item.primaryText}</Text>
                            <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                        </Body>
                        </ListItem>
                    </View>
                }

               />

            </View>
        );
    
}
export default SearchResult;