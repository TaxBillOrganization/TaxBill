import React, { useState }from "react";
import {Dimensions,StyleSheet,View,TouchableOpacity,Text} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {Left,Right,Body} from "native-base";

const windowHeight = Dimensions.get('window').height;   
const windowWidth = Dimensions.get('window').width;


export const optionsItems = ({settings,openSettings,setSettings,getSettings}) => {


  
 
        return(
            <View>
            {settings.options &&

            <View style={styles.container}>

            <TouchableOpacity onPress={ ()=>setSettings(settings,"isSelectedFemale",settings.isSelectedFemale)}
             styles={styles.settingsContainer}>
              <View style={styles.rowContainer}>

                {!settings.isSelectedFemale && <Icon name="square-o" style={styles.checkbox}/>}
                {settings.isSelectedFemale && <Icon name="check-square-o" style={styles.checkbox}/>}

                <Text style={styles.label}>Female</Text>
              </View>
            </TouchableOpacity>
        
            

            <TouchableOpacity onPress={ ()=>setSettings(settings,"isSelectedMale",settings.isSelectedMale)}
             styles={styles.settingsContainer}>
              <View style={styles.rowContainer}>

                {!settings.isSelectedMale && <Icon name="square-o" style={styles.checkbox}/>}
                {settings.isSelectedMale && <Icon name="check-square-o" style={styles.checkbox}/>}

                <Text style={styles.label}>Male</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={ ()=>setSettings(settings,"isSelectedPerson",settings.isSelectedPerson)}
             styles={styles.settingsContainer}>
              <View style={styles.rowContainer}>

                {!settings.isSelectedPerson && <Icon name="square-o" style={styles.checkbox}/>}
                {settings.isSelectedPerson && <Icon name="check-square-o" style={styles.checkbox}/>}

                <Text style={styles.label}>1 Person</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={ ()=>setSettings(settings,"isSelectedPeople",settings.isSelectedPeople)}
             styles={styles.settingsContainer}>
              <View style={styles.rowContainer}>

                {!settings.isSelectedPeople && <Icon name="square-o" style={styles.checkbox}/>}
                {settings.isSelectedPeople && <Icon name="check-square-o" style={styles.checkbox}/>}

                <Text style={styles.label}>2-3 People</Text>
              </View>
            </TouchableOpacity>
            </View>
        } 
        </View>                
        );
    
}
const styles = StyleSheet.create({
    settingsContainer:{
       
        height:500,
        width:300,
        backgroundColor:"#000",
       left:0,
       

    },
    optionsContainer:{
       
        position:"absolute",
        width:40,
        height:40,
        left:(windowWidth/4)+(windowWidth/10),
        top:(windowHeight/10)-(windowHeight/5),
        opacity:0.8,
        flexDirection:"row",
       
        


    },
    iconContainer:{
        fontSize:40

    },
    container: {
      top:(windowHeight/14),
      right:(windowWidth/14),
      backgroundColor:"black",
      opacity:0.7,
      height:(windowHeight/3),
      width:(windowWidth/2)+(windowWidth/5),

      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {

        fontSize:25,
        marginTop:5,
        color:"#FFF",
        marginLeft:10
      },
      label: {
        fontSize:25,
        color:"#FFF",
        opacity:0.9,
        marginLeft:5,
      },
      rowContainer:{
        flexDirection:"row",
       marginLeft:(windowWidth/11),
        marginTop:(windowHeight/45),
      }
});
export default optionsItems;