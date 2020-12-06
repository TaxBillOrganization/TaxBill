import React from 'react';
import {View, Text} from 'react-native';
import createStore from "./store/createStore";
import Appcontainer from "./appContainer";

export default class Root extends React.Component{


    renderApp(){
        
        const initialState = window.___INTITIAL_STATE__;
        const store =  createStore(initialState);
        return (
                <Appcontainer store={store}/>
          
        );
    }

    render(){
        return this.renderApp();
    }

}
