import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './src/screens/MainScreen';
import Ranking from './src/screens/Ranking';
import Statistics from './src/screens/Statistics';
import Account from './src/screens/Account';
import Settings from './src/screens/Settings';

const Stack = createStackNavigator();
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Main Screen" component={MainScreen} />
        <Stack.Screen name="Ranking" component={Ranking} />
        <Stack.Screen name="Statistics" component={Statistics} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
