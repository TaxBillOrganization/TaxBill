import React from "react";
import {Text,StatusBar,Image,View} from "react-native";
import {Header,Left,Body,Right, Button} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./HeaderComponentStyles";
const logo1 = require('../../../../assets/logo.png');
export const HeaderComponent = ({logo}) => {
    return(
        <Header style={{backgroundColor:"#eed74d"}} /*  androidStatusBarColor="#000"*/ >
        <StatusBar barStyle="light-content" backgroundColor="black"/>
       {/*
       <Left>
            <Button transparent>
                <Icon name="bars" style={styles.icon}/>
            </Button>
        </Left>

        BODY

         <Right>
            <Button transparent>
                <Icon name="gift" style={styles.icon}/>
            </Button>
        </Right>
       */}
        

        <Body style ={{alignItems:"center"}}>
        <View style={{flex:1,flexDirection:"row"}}>
            <Image source={require('../../../../assets/logo.png')} style={styles.logo} />
         
            <Text style ={styles.headerText}>TaxBill</Text>
        </View>
            
            
        </Body>

       

        </Header>
    );
}

export default HeaderComponent;