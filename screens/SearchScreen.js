import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyCBoKDUv3Agp1IOImoTfwYqJ2R4jOtqMFI',
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;