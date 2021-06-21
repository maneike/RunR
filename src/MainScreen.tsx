import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import Footer from './components/Footer';
import MapView from './components/MapView';
import {styles} from './MainScreen.styles';

const MainPage: React.FC = () => {
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Text style={{fontWeight: 'bold'}}>MainPage</Text>
        <MapView />
        <Footer />
      </View>
    </ScrollView>
  );
};
export default MainPage;
