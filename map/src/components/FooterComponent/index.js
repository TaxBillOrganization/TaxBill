import React from "react";
import {Text,View} from "react-native";
import {FooterTab, Button} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./FooterComponentStyles";


export const FooterComponent = ({logo}) => {
    //tab bar items
    const tabs = [{
        title:"TaxiCar",
        subTitle:"",
        icon:"car",
    }]
    return(
        <FooterTab style={styles.footerContainer} /*  androidStatusBarColor="#000"*/ >
            <Button>
                <icon size={20}  />
            </Button>
        </FooterTab>
    );
}

export default FooterComponent;