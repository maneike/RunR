import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './LoginScreen.styles';

export default function LoginScreen({navigation}) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailLoggedIn, setEmailLoggedIn] = useState('');
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const onFooterLinkPress = () => {
    navigation.navigate('Registration');
  };

  const onGuestLinkPress = () => {
    navigation.replace('Home');
  };

  if (initializing) return null;
  const onLoginPress = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmailLoggedIn(email);
        console.log('Succesfully logged in!');
        navigation.replace('Home', {email});
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          console.error(error);
          Alert.alert('The password is invalid!');
        }
        if (error.code === 'auth/user-not-found') {
          console.error(error);
          Alert.alert("E-mail doesn't exist!");
        }
        if (error.code === 'auth/invalid-email') {
          console.error(error);
          Alert.alert('E-mail is badly formatted!');
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always">
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
        <View style={styles.footerView}>
          <Text onPress={onGuestLinkPress} style={styles.footerLink}>
            Use the app as a guest
          </Text>
          <Text>{emailLoggedIn ?? 'No user yet'}</Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
