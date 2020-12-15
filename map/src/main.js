import React from 'react';
import {View, Text,ScrollView} from 'react-native';
import createStore from "./store/createStore";
import Appcontainer from "./appContainer";

export default class Root extends React.Component{


    renderApp(){
        
        const initialState = window.___INTITIAL_STATE__;
        const store =  createStore(initialState);
        return (
          
                <Appcontainer user={this.props.kulanici} store={store}/>
            
        );
    }

    render(){
        return this.renderApp();
    }

}
