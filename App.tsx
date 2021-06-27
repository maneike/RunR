import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from './src/screens/MainScreen';
import Ranking from './src/screens/Ranking';
import Statistics from './src/screens/Statistics';
import Account from './src/screens/Account';
import Settings from './src/screens/Settings';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
          tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen
        name="Ranking"
        component={Ranking}
        options={{
          tabBarLabel: 'Ranking',
          tabBarIcon: () => (
            <Image source={require("./assets/podium.png")} style={{width: 24, height: 24}}/>
          ),
        }}
      /><Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarLabel: 'Statistics',
          tabBarIcon: () => (
            <Image source={require("./assets/chart-box-outline.png")} style={{width: 24, height: 24}}/>
          ),
        }}
      /><Tab.Screen
        name="Run"
        component={MainScreen}
        options={{
          tabBarLabel: 'Run',
          tabBarIcon: () => (
            <Image source={require("./assets/run.png")} style={{width: 24, height: 24}}/>
          ),
        }}
      /><Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: () => (
            <Image source={require("./assets/account.png")} style={{width: 24, height: 24}}/>
          ),
        }}
      /><Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: () => (
            <Image source={require("./assets/cog.png")} style={{width: 24, height: 24}}/>
          ),
        }}
      />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
