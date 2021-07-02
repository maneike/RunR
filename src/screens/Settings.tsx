import React from 'react';
import {ScrollView, SafeAreaView, Button, Alert} from 'react-native';
import {styles} from './Tabs.styles';
import auth from '@react-native-firebase/auth';
import {Options} from '../types/options';

const Settings = (options: Options) => {
  const handleSignOutPress = () => {
    auth()
      .signOut()
      .then(() => {
        Alert.alert('Successfully logged out!');
        options.options.navigation.replace('Login');
      })
      .catch(error => {
        if (error.code === 'auth/no-current-user')
          Alert.alert("You're not logged in");
        else Alert.alert('Logging out failed');
        console.error(error);
      });
  };
  const handleLogInButton = () => {
    options.options.navigation.replace('Login');
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FAFAFA'}}>
      <ScrollView contentContainerStyle={styles.mainTabsContainer}>
        {options.options.route.params?.email ? (
          <Button
            title="Sign out"
            onPress={handleSignOutPress}
            color="tomato"
          />
        ) : (
          <Button title="Log in" onPress={handleLogInButton} color="tomato" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Settings;
