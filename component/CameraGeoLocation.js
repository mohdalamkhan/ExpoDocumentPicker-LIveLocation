// 2 Number GeoLocation Picker Started

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ImagePreviewScreens from './ImagePrivewScreen';

const Stack = createStackNavigator();

export default  CameraGeoLocation=()=> {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus === 'granted');

      if (locationStatus === 'granted') {
        const { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const photo = await cameraRef.takePictureAsync(options);

      if (location) {
        console.log(photo.uri); // do something with the photo URI and location data
        console.log(location);
        setPhotoUri(photo.uri);
        navigation.navigate('ImagePreview', { photoUri: photo.uri }); // navigate to the ImagePreviewScreen
      }
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Camera">
        <Stack.Screen
          name="Camera"
          options={{ headerShown: false }}
          component={() => (
            <View style={styles.container}>
              {hasCameraPermission === null || hasLocationPermission === null ? (
                <View />
              ) : hasCameraPermission === false || hasLocationPermission === false ? (
                <Text>No access to camera or location</Text>
              ) : (
                <View style={styles.cameraContainer}>
                  <Camera style={styles.camera} ref={ref => setCameraRef(ref)} />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                      <Text style={styles.buttonText}>Take Picture</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}
        />
        <Stack.Screen name="ImagePreview" component={ImagePreviewScreens} options={{ title: 'Image Preview' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ImagePreviewScreen = ({ navigation, route }) => {
  const { photoUri } = route.params;
  
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: photoUri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    fontSize: 20,
    color: 'black',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    alignSelf: 'center',
    margin: 20,
  },
});

