import React from 'react';
import {ScrollView, Text, SafeAreaView} from 'react-native';
import {styles} from './Tabs.styles';

const Settings: React.FC = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#FAFAFA'}}>
      <ScrollView contentContainerStyle={styles.mainTabsContainer}>
        <Text style={styles.titleText}>Settings will be here!</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Settings;
