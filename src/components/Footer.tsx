import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './Footer.styles';

const Footer: React.FC = ({navigation}) => {
  const handleTabPress = (tab: string) => {
    navigation.navigate(tab);
  };
  const screens = ['Ranking', 'Statistics', 'Run!', 'Account', 'Settings'];
  return (
    <View style={styles.mainFooterContainer}>
      {screens.map((screen, screenIdx) => {
        return (
          <Text
            key={screenIdx}
            style={styles.tabText}
            onPress={() => handleTabPress(screen)}>
            {screen}
          </Text>
        );
      })}
    </View>
  );
};
export default Footer;
