import React, {useState} from "react";
import {View,StatusBar,StyleSheet,TouchableOpacity,Button} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./dateTimeStyles";
import Icon from "react-native-vector-icons/FontAwesome";

export const DateTime = ({settings,getDate}) =>{
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);



  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    getDate(currentDate);
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


    return (    
      <View style ={styles.searchBox}>
        <StatusBar barStyle="light-content" backgroundColor="black"/>
        <View style={styles.inputWrapper}>
          <View>
            <Icon name="calendar" size={15} color="#FF5E3A" style={{paddingLeft:7}}/>
          </View>
          <View  style={styles.secondInputWrapper}>
            <Button onPress={showDatepicker} title="Date picker!" color="#FF5E3A"/>
          </View>
          <View  style={styles.secondInputWrapper}>
            <Button onPress={showTimepicker} title="Time picker!" color="#FF5E3A"/>
          </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>

      );
    }
export default DateTime;


