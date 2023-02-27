import { StyleSheet, Text,View, Image } from 'react-native';
import React from 'react';

const ImagePreviewScreen = ({ navigation, route }) => {
  const { photoUri, location } = route.params;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: photoUri }} />
      <Text style={styles.locationText}>
        Latitude: {location.latitude}, Longitude: {location.longitude}
      </Text>
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
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  locationText: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
  },
});

export default ImagePreviewScreen;