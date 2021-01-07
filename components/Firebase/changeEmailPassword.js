import React from 'react';
import { ScrollView, StyleSheet, TextInput, StatusBar, Alert, } from 'react-native';
import * as firebase from 'firebase';
import Colors from '../../utils/colors';
import AppButton from '../../components/ChangeButton';

export default class Change extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      newEmail: "",
    };
  }

  onSignoutPress = () => {
    var user = firebase.auth().currentUser;
    firebase.database().ref('Users/'+ user.uid + ('/Comments')).off()
    firebase.database().ref('Users/'+ user.uid + ('/ProfileInformation')).off()
    firebase.auth().signOut();
  }

  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  onChangePasswordPress = () => {
    if(this.state.currentPassword==""){
      console.error("You must enter your current password");
    }
      else {
      this.reauthenticate(this.state.currentPassword).then(() => {
        var user = firebase.auth().currentUser;
        user.updatePassword(this.state.newPassword).then(() => {
          Alert.alert("Password was changed");
        }).catch((error) => { console.log(error.message); });
      }).catch((error) => { console.log(error.message) });
    }
  }

  onChangeEmailPress = () => {
    if(this.state.currentPassword==""){
      console.error("You must enter your current password");
    }
    else {
      this.reauthenticate(this.state.currentPassword).then(() => {
        var user = firebase.auth().currentUser;
        user.updateEmail(this.state.newEmail).then(() => {
          Alert.alert("Email was changed");
          firebase.database().ref('Users/'+ user.uid +('/ProfileInformation')).update({
          email:this.state.newEmail,
          });
        }).catch((error) => { console.log(error.message); });
      }).catch((error) => { console.log(error.message) });
    }
  }
  
  render() {
    return (
      <ScrollView style={{flex: 1, flexDirection: "column", paddingVertical: "3%", paddingHorizontal: "5%",}}>
        <StatusBar barStyle="light-content" backgroundColor="black"/>
        <TextInput style={styles.textInput} value={this.state.currentPassword}
          placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
          onChangeText={(text) => { this.setState({currentPassword: text}) }}
        />

        <TextInput style={styles.textInput} value={this.state.newPassword}
          placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
          onChangeText={(text) => { this.setState({newPassword: text}) }}
        />

        <AppButton title="Change Password" onPress={this.onChangePasswordPress} />


        <TextInput style={styles.textInput} value={this.state.newEmail}
          placeholder="New Email" autoCapitalize="none" keyboardType="email-address"
          onChangeText={(text) => { this.setState({newEmail: text}) }}
        />
        <AppButton title="Change Email" onPress={this.onChangeEmailPress} />
        <AppButton color="red" title="Sign out" onPress={this.onSignoutPress} />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    text: { 
        color: "white", 
        fontWeight: "bold", 
        fontSize: 20, 
    },
    textInput: {
        borderWidth:1, 
        borderColor:"gray", 
        borderRadius: 30,
        marginVertical: 5, 
        padding:10, 
        height:40, 
        alignSelf: "stretch", 
        fontSize: 18, 
        textAlign: "center", 
    },
});