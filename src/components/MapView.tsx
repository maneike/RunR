import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, Button, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';

const MapField: React.FC = () => {
  const [latLng, setlatLng] = useState({longitude: 0, latitude: 0});

  useEffect(() => {
    Geolocation.requestAuthorization('whenInUse');
    Geolocation.getCurrentPosition(
      position => {
        setlatLng({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      error => {
        console.log(error.code, error.message);
        Alert.alert("Couldn't get your location :(");
      },
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 2000},
    );
  }, []);

  return (
    <View>
      <MapView
        style={{height: 600, width: '100%'}}
        region={{
          latitude: latLng.latitude,
          longitude: latLng.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}>
        <Marker coordinate={latLng} />
      </MapView>
      <ScrollView>
        <Text>{`Longitude: ${latLng.longitude}`}</Text>
        <Text>{`Latitude: ${latLng.latitude}`}</Text>
        {/* <Button title="Get location" onPress={handleGetLocationButton} /> */}
      </ScrollView>
    </View>
  );
};
export default MapField;
