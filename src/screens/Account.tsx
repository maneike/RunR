import React from 'react';
import {ScrollView, Text, SafeAreaView} from 'react-native';
import {styles} from './Tabs.styles';
import {Options} from '../types/options';

const Account = (options: Options) => {
  console.log(options);
  return (
    <SafeAreaView style={{backgroundColor: '#FAFAFA'}}>
      <ScrollView contentContainerStyle={styles.mainTabsContainer}>
        <Text style={styles.titleText}>
          {options.options.route.params?.email ? (
            <Text>
              Hello{' '}
              <Text style={{color: 'tomato'}}>
                {options.options.route.params.email}
              </Text>
              !
            </Text>
          ) : (
            'Hello Guest!'
          )}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Account;
