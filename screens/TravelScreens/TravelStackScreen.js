import  React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TravelScreen from './TravelScreen'
import DeleteTravelScreen from './DeleteTravelScreen'
const TravelStack = createStackNavigator();


export default function TravelStacScreen() {  
  return (
    <TravelStack.Navigator options={{headerShown: false}} screenOptions={{headerShown: false}}>
        <TravelStack.Screen name="TravelPage" component={TravelScreen}/>
        <TravelStack.Screen name="DeleteTravel" component={DeleteTravelScreen}/>
    </TravelStack.Navigator>
    );
  }