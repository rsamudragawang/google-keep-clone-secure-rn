// import lib/rn
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

// props
interface LoginProps {
  onAuthenticated: () => void;
}

// init rn biometrics
const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });


const Login = ({ onAuthenticated }: LoginProps): JSX.Element => {
  //init var
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);
  const [title, setTitle] = useState('Biometric Login');

  // function prompt biometric
  const promptBiometric = () => {
    rnBiometrics
      .simplePrompt({ promptMessage: 'Confirm for login' })
      .then(resultObject => {
        const { success } = resultObject;

        if (success) {
          onAuthenticated();
        } else {
          setTitle('Verify failed')
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  };

  // function check available biometrics
  const verifyBiometryType = async () => {
    const { available, biometryType } =
      await rnBiometrics.isSensorAvailable();

    if (available && biometryType === BiometryTypes.TouchID) {
      setBiometricsAvailable(true);
    } else if (available && biometryType === BiometryTypes.FaceID) {
      setBiometricsAvailable(true);
    } else if (available && biometryType === BiometryTypes.Biometrics) {
      setBiometricsAvailable(true);
    } else {
      setTitle('Biometrics not supported or Try enable device screen lock with Pattern or PIN.');
    }
  };
  useEffect(() => {
    verifyBiometryType();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Verify Your Self
      </Text>
      {biometricsAvailable && (
        <TouchableOpacity id='login-biometric' onPress={() => promptBiometric()}>
          <Image source={require('../assets/finger_print.png')} />
        </TouchableOpacity>
      )}
      <Text style={styles.errorMessage}>{title}</Text>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222'
  },
  heading: {
    color: '#ffffff',
    fontSize: 22,
    marginTop: 30,
    marginBottom: 5,
  },
  errorMessage: {
    color: '#ea3d13',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 30,
  },
});

export default Login;
