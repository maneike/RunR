import React, {useState, useEffect} from 'react';
import {ScrollView, Text, Button} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
const MapView: React.FC = () => {
  const [location, setLocation] = useState(true);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  useEffect(() => {
    Geolocation.requestAuthorization('whenInUse');
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 1000, maximumAge: 10000},
    );
  }, [location]);

  return (
    <ScrollView>
      <Text style={{fontWeight: 'bold'}}>MapView</Text>
      <Text>{`Longitude: ${longitude}`}</Text>
      <Text>{`Latitude: ${latitude}`}</Text>
      <Button title="Get location" onPress={() => setLocation(!location)} />
    </ScrollView>
  );
};
export default MapView;
