import React, {useState} from "react";
import {View,Text,StyleSheet} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./dateTimeStyles";
import Icon from "react-native-vector-icons/FontAwesome";


export const DateTime = ({}) =>{

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
 
        return(
            <View style ={styles.searchBox}>
                <View style={styles.inputWrapper} testID="dateTimePicker" value={date} mode={mode}>
                   {/*  <DateTimePicker is24Hour={true} display="default"/>*/}
                    
                </View>
            </View>
        );
    
}
export default DateTime;