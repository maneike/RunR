import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import Footer from './components/Footer';
import {styles} from './MainScreen.styles';

const MainPage: React.FC = () => {
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Text>MainPage</Text>
        <Footer />
      </View>
    </ScrollView>
  );
};
export default MainPage;
