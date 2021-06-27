import React from 'react';
import {ScrollView, View, Text, SafeAreaView} from 'react-native';
import {styles} from './Statistics.styles';

const Ranking: React.FC = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#FAFAFA'}}>
      <ScrollView contentContainerStyle={styles.mainStatisticsContainer}>
        <Text style={styles.titleText}>Ranking will be here!</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Ranking;
