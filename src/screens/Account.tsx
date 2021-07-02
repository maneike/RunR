import React from 'react';
import {ScrollView, Text, SafeAreaView} from 'react-native';
import {styles} from './Tabs.styles';

const Account = email => {
  console.log(email);
  return (
    <SafeAreaView style={{backgroundColor: '#FAFAFA'}}>
      <ScrollView contentContainerStyle={styles.mainTabsContainer}>
        <Text style={styles.titleText}>
          {email.email.route.params.email
            ? `Current user: ${email.email.route.params.email}`
            : 'Account info will be here!'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Account;
