import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';

import {
  StyledContainer,
  PageLogo,
  PageTitle,
  StyledFormArea,
  StyledButton,
  InnerContainer,
  ButtonText,
  Line,
  Colors,
} from './../components/styles';
import { View, ActivityIndicator } from 'react-native';

//colors
const { darkLight, brand, primary } = Colors;

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

// keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

// api client
import axios from 'axios';

// Google Signin
import * as Google from 'expo-google-app-auth';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  // credentials context
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

  const handleGoogleSignin = () => {
    setGoogleSubmitting(true);
    const config = {
      iosClientId: `820122193160-9fo2h9g1ks4r1j35vk4bsvfplmla1t2t.apps.googleusercontent.com`,
      androidClientId: `782607156495-t08mgso56tjsp7und7lf81b2bmis239f.apps.googleusercontent.com`,
      scopes: ['profile', 'email'],
    };

    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type == 'success') {
          const { email, name, photoUrl } = user;
          persistLogin({ email, name, photoUrl }, 'Google signin successful', 'SUCCESS');
        } else {
          handleMessage('Google Signin was cancelled');
        }
        setGoogleSubmitting(false);
      })
      .catch((error) => {
        handleMessage('An error occurred. Check your network and try again');
        console.log(error);
        setGoogleSubmitting(false);
      });
  };

  // Persisting login
  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem('flowerCribCredentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage('Persisting login failed');
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('./../assets/img/Logo.png')} />
          <PageTitle>Warna Printing</PageTitle>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == '' || values.password == '') {
                handleMessage('Please fill in all fields');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <Line />
                {!googleSubmitting && (
                  <StyledButton onPress={handleGoogleSignin} google={true}>
                    <Fontisto name="google" size={25} color={primary} />
                    <ButtonText google={true}>Sign in with Google</ButtonText>
                  </StyledButton>
                )}
                {googleSubmitting && (
                  <StyledButton disabled={true} google={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};
export default Login;