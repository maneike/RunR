import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import MapView from '../components/MapView';
import {styles} from './MainScreen.styles';

const MainPage = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#FAFAFA'}}>
      <ScrollView
        contentContainerStyle={{height: '100%', backgroundColor: '#FAFAFA'}}>
        <View style={styles.titleSection}>
          <ActivityIndicator size="small" color="#00aaff" />
          <Text style={styles.titleText}>Run R</Text>
          <ActivityIndicator size="small" color="tomato" />
        </View>
        <MapView />
      </ScrollView>
    </SafeAreaView>
  );
};
export default MainPage;
