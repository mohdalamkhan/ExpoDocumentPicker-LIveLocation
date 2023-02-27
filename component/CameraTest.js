// This code is not working from another component.

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';

const CameraTest =()=> {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestMicrophonePermissionsAsync();
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
      }
    }
  };

  return (
    <View style={styles.container}>
      {hasCameraPermission === null || hasLocationPermission === null ? (
        <View />
      ) : hasCameraPermission === false || hasLocationPermission === false ? (
        <Text>No access to camera or location</Text>
      ) : (
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={setCameraRef} />
          {photoUri && (
            <View style={styles.thumbnailContainer}>
              <Image style={styles.thumbnail} source={{ uri: photoUri }} />
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default CameraTest

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  camera: {
    flex: 1,
  },
  thumbnailContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'white',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    alignSelf: 'center',
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
});

