import React from "react";
import {Text,StyleSheet,Image,View} from "react-native";
import {Header,Body} from "native-base";
const logo1 = require('../assets/logo.png');
export const HeaderComponent = ({logo}) => {
    return(
        <Header style={{backgroundColor:"#eed74d"}} >   
        <Body style ={{alignItems:"center"}}>
        <View style={{flex:1,flexDirection:"row"}}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
         
            <Text style ={styles.headerText}>TaxBill</Text>
        </View>           
        </Body>
        </Header>
    );
}

const styles = StyleSheet.create({
	icon:{
		color:"#fff",
		fontSize:20
	},
	headerText:{
		color:"#fff",
        fontSize:25,
        alignItems:"center",
		fontWeight:"bold",
		marginTop:10,
		marginRight:50
	},
	logo:{
		width:40,
		height:40,
		marginTop:7,
		marginRight:10
		
	}

});
export default HeaderComponent;