import React from "react";
import {View,Text, Button} from "react-native";
import MapContanier from "./mapContainer";
import HeaderComponent from "../../../components/HeaderComponent";
import { Container} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
const logo = require('../../../../../assets/logo.png');

class Home extends React.Component{

    componentDidMount(){
        this.props.getCurrentLocation();
    }
    
    render(){
        const region ={
            
        }
        return(
            
            <Container>
                <HeaderComponent logo={logo}/>
                {this.props.region.latitude &&
                <MapContanier region ={this.props.region} getInputData={this.props.getInputData} 
                toggleSearchResultModal={this.props.toggleSearchResultModal}
                getAddressPrediction={this.props.getAddressPrediction}
                resultTypes={this.props.resultTypes}
                predictions ={this.props.predictions}
                getSelectedAdress = {this.props.getSelectedAdress}
                selectedAddress ={this.props.selectedAddress}
                saveTrack = {this.props.saveTrack}
                settings = {this.props.settings}
                openSettings = {this.props.openSettings}
                getSettings = {this.props.getSettings}
                setSettings = {this.props.setSettings}
                getDate = {this.props.getDate}
                />
    }          

            </Container>
                 
                    
                 
        );
    }
}
export default Home;