import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Button,
  Linking,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Switch,
  Text,
  ToastAndroid,
  View,
  Image,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import MapView from './src/components/MapView';
import appConfig from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ranking from './src/screens/Ranking';
import Statistics from './src/screens/Statistics';
import Account from './src/screens/Account';
import Settings from './src/screens/Settings';
import LoginScreen from './src/screens/LoginScreen';
import Registration from './src/screens/Registration';
import {styles} from './src/screens/MainScreen.styles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home(email) {
  return (
    <Tab.Navigator
      initialRouteName="Run"
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
            <Image
              source={require('./assets/podium.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarLabel: 'Statistics',
          tabBarIcon: () => (
            <Image
              source={require('./assets/chart-box-outline.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Run"
        component={MapScreen}
        options={{
          tabBarLabel: 'Run',
          tabBarIcon: () => (
            <Image
              source={require('./assets/run.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: () => (
            <Image
              source={require('./assets/account.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}>
        {() => <Account email={email} />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: () => (
            <Image
              source={require('./assets/cog.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MapScreen() {
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);
  const [observing, setObserving] = useState(false);
  const [foregroundService, setForegroundService] = useState(false);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [location, setLocation] = useState(null);

  const watchId = useRef(null);

  useEffect(() => {
    return () => {
      removeLocationUpdates();
    };
  }, [removeLocationUpdates]);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        console.log(position);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
      },
    );
  };

  const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    if (Platform.OS === 'android' && foregroundService) {
      await startForegroundService();
    }

    setObserving(true);

    watchId.current = Geolocation.watchPosition(
      position => {
        setLocation(position);
        console.log(position);
      },
      error => {
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
        useSignificantChanges: significantChanges,
      },
    );
  };

  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      stopForegroundService();
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setObserving(false);
    }
  }, [stopForegroundService]);

  const startForegroundService = async () => {
    if (Platform.Version >= 26) {
      await VIForegroundService.createNotificationChannel({
        id: 'locationChannel',
        name: 'Location Tracking Channel',
        description: 'Tracks location of user',
        enableVibration: false,
      });
    }

    return VIForegroundService.startService({
      channelId: 'locationChannel',
      id: 420,
      title: appConfig.displayName,
      text: 'Tracking location updates',
      icon: 'ic_launcher',
    });
  };

  const stopForegroundService = useCallback(() => {
    VIForegroundService.stopService().catch(err => err);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <MapView coords={location?.coords || null} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View>
          <View style={styles.option}>
            <Text>Enable High Accuracy</Text>
            <Switch onValueChange={setHighAccuracy} value={highAccuracy} />
          </View>

          {Platform.OS === 'ios' && (
            <View style={styles.option}>
              <Text>Use Significant Changes</Text>
              <Switch
                onValueChange={setSignificantChanges}
                value={significantChanges}
              />
            </View>
          )}

          {Platform.OS === 'android' && (
            <>
              <View style={styles.option}>
                <Text>Show Location Dialog</Text>
                <Switch
                  onValueChange={setLocationDialog}
                  value={locationDialog}
                />
              </View>
              <View style={styles.option}>
                <Text>Force Location Request</Text>
                <Switch
                  onValueChange={setForceLocation}
                  value={forceLocation}
                />
              </View>
              <View style={styles.option}>
                <Text>Use Location Manager</Text>
                <Switch
                  onValueChange={setUseLocationManager}
                  value={useLocationManager}
                />
              </View>
              <View style={styles.option}>
                <Text>Enable Foreground Service</Text>
                <Switch
                  onValueChange={setForegroundService}
                  value={foregroundService}
                />
              </View>
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Get Location" onPress={getLocation} />
          <View style={styles.buttons}>
            <Button
              title="Start Observing"
              onPress={getLocationUpdates}
              disabled={observing}
            />
            <Button
              title="Stop Observing"
              onPress={removeLocationUpdates}
              disabled={!observing}
            />
          </View>
        </View>
        <View style={styles.result}>
          <Text>Latitude: {location?.coords?.latitude || ''}</Text>
          <Text>Longitude: {location?.coords?.longitude || ''}</Text>
          <Text>Heading: {location?.coords?.heading}</Text>
          <Text>Accuracy: {location?.coords?.accuracy}</Text>
          <Text>Altitude: {location?.coords?.altitude}</Text>
          <Text>Altitude Accuracy: {location?.coords?.altitudeAccuracy}</Text>
          <Text>Speed: {location?.coords?.speed}</Text>
          <Text>Provider: {location?.provider || ''}</Text>
          <Text>
            Timestamp:{' '}
            {location?.timestamp
              ? new Date(location.timestamp).toLocaleString()
              : ''}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'RunR', headerLeft: () => null}}
        />
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
