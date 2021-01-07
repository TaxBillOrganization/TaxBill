import React from "react";
import {StatusBar,Text, Button} from "react-native";
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
                <StatusBar barStyle="light-content" backgroundColor="black"/>
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
                date = {this.props.Date}
                startEndPoint={this.props.startEndPoint}
                />
                }          

            </Container>           
        );
    }
}
export default Home;