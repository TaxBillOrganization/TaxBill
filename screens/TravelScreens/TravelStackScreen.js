import  React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TravelScreen from './TravelScreen'
import DeleteTravelScreen from './DeleteTravelScreen'
const TravelStack = createStackNavigator();


export default function TravelStacScreen() {  
  return (
    <TravelStack.Navigator initialRouteName="TravelPage" options={{headerShown: false}} screenOptions={{headerShown: false}}>
        <TravelStack.Screen name="TravelPage" component={TravelScreen}/>
        <TravelStack.Screen name="DeleteTravel" component={DeleteTravelScreen}
      options={({ route }) => ({
      title: route.params.Region
      })} />
    </TravelStack.Navigator>
    );
  }