import React, { useState } from 'react';
import { StyleSheet,Image,View,StatusBar } from 'react-native';
import * as Yup from 'yup';
import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import { passwordReset } from '../components/Firebase/firebase';
import FormErrorMessage from '../components/Forms/FormErrorMessage';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email')
});

export default function ForgotPasswordScreen({ navigation }) {
  const [customError, setCustomError] = useState('');

  async function handlePasswordReset(values) {
    const { email } = values;

    try {
      await passwordReset(email);
      navigation.navigate('Welcome');
    } catch (error) {
      setCustomError(error.message);
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
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handlePasswordReset(values)}
      >
        <FormField
          name="email"
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={false}
        />
        <FormButton title="Forgot Password" />
        {<FormErrorMessage error={customError} visible={true} />}
      </Form>
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
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  logo: {
    width: 200,
    height: 200
    
  },
  logoFrame: {
    paddingTop: 5,
    alignItems: 'center',
  },
});
