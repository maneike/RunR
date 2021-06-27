import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import Footer from '../components/Footer';
import MapView from '../components/MapView';
import {styles} from './MainScreen.styles';

const MainPage = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#FAFAFA'}}>
      <ScrollView
        contentContainerStyle={{height: '100%', backgroundColor: '#FAFAFA'}}>
        <View style={styles.titleSection}>
          <ActivityIndicator size="small" color="#00aaff" />
          <Text style={styles.titleText}>Run R</Text>
          <ActivityIndicator size="small" color="#ffaa00" />
        </View>
        <MapView />
        <Footer navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default MainPage;
