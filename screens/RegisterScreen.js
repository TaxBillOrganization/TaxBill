import React, { useState } from 'react';
import { StyleSheet,ScrollView,Image,View,Text} from 'react-native';
import * as Yup from 'yup';
import { RadioButton } from 'react-native-paper';

import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import { registerWithEmail } from '../components/Firebase/firebase';
import useStatusBar from '../hooks/useStatusBar';

const validationSchema = Yup.object().shape({
  tc: Yup.string()
    .required()
    .label('Tc No'),
  name: Yup.string()
    .required()
    .label('Name'),
  surname: Yup.string()
    .required()
    .label('Surname'),
  birtday: Yup.string()
    .required()
    .label('BirtDay'),  
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
  useStatusBar('light-content');

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
    const { email, password } = values;
    try {
      await registerWithEmail(email, password);
    } catch (error) {
      setRegisterError(error.message);
    }
  }
  const [checked, setChecked] = React.useState('m');
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoFrame}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
    </View>
    <SafeView >
     
      <Form
        initialValues={{
          tc:'',
          name: '',
          surname:'',
          birtday:'',
          email: '',
          password: '',
          confirmPassword: '',
          
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleOnSignUp(values)}
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
          name="birtday"
          leftIcon="account"
          placeholder="Enter birtday"
          autoFocus={false}
        />

        <View style={{ flexDirection: 'row',fontSize:20,backgroundColor:"#b7ab4d",borderRadius:25,height:45,
        marginVertical: 10
      }}>
              <View style={{ flexDirection: 'row',alignItems:"center"}}>
                <RadioButton
                  value="f"
                  status={checked === 'f' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('f')}
                />
                <Text style={{fontSize:20}}>Female</Text>
              </View>

              <View style={{ flexDirection: 'row',marginLeft:"15%",alignItems:"center"}}>
                <RadioButton
                  value="m"
                  status={checked === 'm' ? 'checked' : 'unchecked'}
                  onPress={()=>setChecked('m')}
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
    width: 215,
    height: 190
  },
  logoFrame: {
    paddingTop: 45,
    alignItems: 'center',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  }
});
