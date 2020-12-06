import React from "react";
import {View,Text} from "react-native";
import MapContanier from "./mapContainer";
import {Container} from "native-base";

class Home extends React.Component{

    componentDidMount(){
        this.props.getCurrentLocation();
    }

    render(){
        const region ={
            latitude:41.024900,
            longitude:29.038930,
            latitudeDelta:0.0922,
            longitudeDelta:0.0421
        }
        return(
            <Container>
                {this.props.region.latitude &&
                <MapContanier region ={this.props.region}/>
    }
            </Container>
        );
    }
}
export default Home;