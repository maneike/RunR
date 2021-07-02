// import React, {useState, useEffect} from 'react';
// import {View, ScrollView, Text, Button, Alert} from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import MapView, {Marker} from 'react-native-maps';

// const MapField: React.FC = () => {
//   const [latLng, setlatLng] = useState({longitude: 0, latitude: 0});

//   useEffect(() => {
//     Geolocation.requestAuthorization('whenInUse');
//     Geolocation.getCurrentPosition(
//       position => {
//         setlatLng({
//           longitude: position.coords.longitude,
//           latitude: position.coords.latitude,
//         });
//       },
//       error => {
//         console.log(error.code, error.message);
//         Alert.alert("Couldn't get your location :(");
//       },
//       {enableHighAccuracy: true, timeout: 10000, maximumAge: 2000},
//     );
//   }, []);

//   return (
//     <View>
//       <MapView
//         style={{height: 600, width: '100%'}}
//         region={{
//           latitude: latLng.latitude,
//           longitude: latLng.longitude,
//           latitudeDelta: 0.002,
//           longitudeDelta: 0.002,
//         }}>
//         <Marker coordinate={latLng} />
//       </MapView>
//       <ScrollView>
//         <Text>{`Longitude: ${latLng.longitude}`}</Text>
//         <Text>{`Latitude: ${latLng.latitude}`}</Text>
//         {/* <Button title="Get location" onPress={handleGetLocationButton} /> */}
//       </ScrollView>
//     </View>
//   );
// };
// export default MapField;
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import RNMapView, { Circle, Marker } from 'react-native-maps';

const MapView = ({ coords }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!!coords && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 16,
      });
    }
  }, [coords]);

  return (
    <View style={styles.container}>
      <RNMapView
        ref={mapRef}
        initialCamera={{
          altitude: 15000,
          center: {
            latitude: 23.7603,
            longitude: 90.4125,
          },
          heading: 0,
          pitch: 0,
          zoom: 11,
        }}
        loadingEnabled
        loadingBackgroundColor="white"
        style={StyleSheet.absoluteFillObject}
        rotateEnabled={false}
      >
        {!!coords && (
          <>
            <Marker
              anchor={{ x: 0.5, y: 0.6 }}
              coordinate={{
                latitude: coords.latitude,
                longitude: coords.longitude,
              }}
              flat
              style={{
                ...(coords.heading !== -1 && {
                  transform: [
                    {
                      rotate: `${coords.heading}deg`,
                    },
                  ],
                }),
              }}
            >
              <View style={styles.dotContainer}>
                <View style={[styles.arrow]} />
                <View style={styles.dot} />
              </View>
            </Marker>
            <Circle
              center={{
                latitude: coords.latitude,
                longitude: coords.longitude,
              }}
              radius={coords.accuracy}
              strokeColor="rgba(0, 150, 255, 0.5)"
              fillColor="rgba(0, 150, 255, 0.5)"
            />
          </>
        )}
      </RNMapView>
    </View>
  );
};

export default MapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'rgb(0, 120, 255)',
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 12,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 4,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgb(0, 120, 255)',
  },
});