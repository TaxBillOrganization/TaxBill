import React, { useState }from "react";
import {Dimensions,StyleSheet,View,TouchableOpacity,StatusBar} from "react-native";
import Icon from "react-native-vector-icons/Fontisto";

const windowHeight = Dimensions.get('window').height;   
const windowWidth = Dimensions.get('window').width;


export const options = ({settings,openSettings,setSettings,getSettings}) => {


    const [isSelectedFemale, setFemale] = useState(true);

    const [isSelectedMale, setMale] = useState(true);
    const [isSelectedOnePerson, setOnePerson] = useState(true);
    const [isSelectedMultiplePeople, setMultiplePeople] = useState(true);

    function handleOpen(parameter){
        openSettings(parameter);
    }
  
 
        return(
           
            <View style={styles.optionsContainer}>
              <StatusBar barStyle="light-content" backgroundColor="black"/>
                    <TouchableOpacity onPress={()=> handleOpen(settings) }>
                         <Icon name="player-settings" style={styles.iconContainer}/>
                    </TouchableOpacity>
               

               
            </View>
        
        );
    
}
const styles = StyleSheet.create({
    settingsContainer:{
       
        height:500,
        width:300,
        backgroundColor:"#000",
       left:0

    },
    optionsContainer:{
       
        position:"absolute",
        width:40,
        height:40,
        left:(windowWidth/2)+(windowWidth/3),
        top:(windowHeight/2.7),
        opacity:0.8,
        flexDirection:"row",
       
        


    },
    iconContainer:{
        fontSize:40

    },
    container: {
        position:"absolute",
        right:200,
        backgroundColor:"white",
        height:100,
        width:100,

      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
      },
});
export default options;