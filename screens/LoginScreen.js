import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image,KeyboardAvoidingView,StatusBar,
  ScrollView} from 'react-native';
import * as Yup from 'yup';

import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import { loginWithEmail } from '../components/Firebase/firebase';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import useStatusBar from '../hooks/useStatusBar';
import { color } from 'react-native-reanimated';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter a registered email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password')
});

export default function LoginScreen({ navigation }) {
  useStatusBar('light-content');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  async function handleOnLogin(values) {
    const { email, password } = values;

    try {
      await loginWithEmail(email, password);
    } catch (error) {
      setLoginError(error.message);
    }
  }

  return (
    
    <SafeView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black"/>
    <View style={styles.logoFrame}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
    </View>
    <View>
      <Form
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handleOnLogin(values)}
      >
        <KeyboardAvoidingView>
        <FormField
          name="email"
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={false}
        />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView>
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
        </KeyboardAvoidingView>
        <FormButton title={'Login'} />
        {<FormErrorMessage error={loginError} visible={true} />}
      </Form>
      <View style={styles.footerButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color={Colors.black}
        size={30}
        onPress={() => navigation.goBack()}
      />
      </View>
    </SafeView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundColor
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordButtonText: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '600'
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoFrame: {
    top:5,
    alignItems: 'center',
    
    
  },
});
