import React from 'react';
import { Image, StyleSheet, Button, Text, View, Alert, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

export default class photo extends React.Component {

  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    var user = firebase.auth().currentUser;
    if (!result.cancelled) {
      this.uploadImage(result.uri, user.uid)
        .then(() => {
          Alert.alert("Success");
          this.getLink(user.uid)
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
 
  }
  
  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);

    return ref.put(blob);
  }
  
  getLink = async (uid) => {
    const url = await firebase.storage().ref().child("images/" + uid).getDownloadURL().catch((error) => { throw error });
    console.error(url);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Choose image..." onPress={this.onChooseImagePress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, alignItems: "center", },
});
