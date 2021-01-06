import React, { useState, useEffect } from 'react';
import { StyleSheet,ScrollView,Image,View,Text,StatusBar} from 'react-native';
import * as Yup from 'yup';
import { RadioButton } from 'react-native-paper';
import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import { registerWithEmail, pushProfil } from '../components/Firebase/firebase';

const validationSchema = Yup.object().shape({
  tc: Yup.string()
    .required()
    .length(11,'TC length must be 11 character')
    .label('TC No'),
  name: Yup.string()
    .required()
    .label('Name'),
  surname: Yup.string()
    .required()
    .label('Surname'),
  age: Yup.string()
    .required()
    .label('Age'),  
  email: Yup.string()
    .required('Please enter a valid email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must match Password')
    .required('Confirm Password is required')
});

export default function RegisterScreen({ navigation }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('eye');
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true
  );
  const [registerError, setRegisterError] = useState('');

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  function handleConfirmPasswordVisibility() {
    if (confirmPasswordIcon === 'eye') {
      setConfirmPasswordIcon('eye-off');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (confirmPasswordIcon === 'eye-off') {
      setConfirmPasswordIcon('eye');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  }

  async function handleOnSignUp(values, actions) {
    const {tc, name, surname, age, email, password } = values;
    var uid;
    try {
      await registerWithEmail(email, password).then((User)=>uid=User.user.uid);
    } catch (error) {
      setRegisterError(error.message);
    }
    pushProfil (tc, uid, name, surname, age, email, checked );
  }

  const [checked, setChecked] = React.useState('Male');
  const initialValues={
    tc:'',
    uid:'',
    name: '',
    surname:'',
    age:'',
    email: '',
    gender :'',
    password: '',
    confirmPassword: '' 
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black"/>
      <View style={styles.logoFrame}>
      <Image source={require("../assets/logo.png")} style={styles.logo}/>
      </View>
    <SafeView >
      <Form
        initialValues={{
          tc:'',
          uid:'',
          name: '',
          surname:'',
          age:'',
          email: '',
          gender :'',
          password: '',
          confirmPassword: '' 
        }}
        validationSchema={validationSchema}
        onSubmit={values=>handleOnSignUp(values)}
      >
        <FormField
          name="tc"
          leftIcon="account"
          placeholder="Enter TC No"
          autoFocus={false}
        />
        <FormField
          name="name"
          leftIcon="account"
          placeholder="Enter name"
          autoFocus={false}
        />
        <FormField
          name="surname"
          leftIcon="account"
          placeholder="Enter surname"
          autoFocus={false}
        />
        <FormField
          name="age"
          leftIcon="account"
          placeholder="Enter age"
          autoFocus={false}
        />

        <View style={{ flexDirection: 'row',fontSize:20,backgroundColor:"#b7ab4d",borderRadius:25,height:45,
        marginVertical: 10
      }}>
              <View style={{ flexDirection: 'row',alignItems:"center"}}>
                <RadioButton
                  value="Female"
                  status={checked === 'Female' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('Female')}
                />
                <Text style={{fontSize:20}}>Female</Text>
              </View>

              <View style={{ flexDirection: 'row',marginLeft:"15%",alignItems:"center"}}>
                <RadioButton
                  value="Male"
                  status={checked === 'Male' ? 'checked' : 'unchecked'}
                  onPress={()=>setChecked('Male')}
                />
                <Text style={{fontSize:20}}>Male</Text>
              </View>
      </View>

        <FormField
          name="email"
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <FormField
          name="password"
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <FormField
          name="confirmPassword"
          leftIcon="lock"
          placeholder="Confirm password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={confirmPasswordVisibility}
          textContentType="password"
          rightIcon={confirmPasswordIcon}
          handlePasswordVisibility={handleConfirmPasswordVisibility}
        />

        <FormButton title={'Register'} />
        {<FormErrorMessage error={registerError} visible={true} />}
      </Form>
      <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color={Colors.black}
        size={30}
        onPress={() => navigation.goBack()}
      />

    </SafeView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.backgroundColor
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoFrame: {
    paddingTop: 45,
    alignItems: 'center',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
});
