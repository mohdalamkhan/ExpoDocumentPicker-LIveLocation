//import liraries
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';
// import Api from './Api';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const NewFile = () => {
  const [image, setImage] = useState('');

  //

  const AddImageStore = async () => {
    console.log('FCALLED');
    try {
      const response = await fetch(
        'https://mandeclan.com/v1/serviceApi/service_photo_gallery_add',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            service_id: 1,
            gallery_img: image,
          }),
        },
      );

      const json = await response.json();

      console.log(json);

      if (json.status == 'success') {
        navigation.goBack();
      }
    } catch (error) {
      // console.error(error)
    }
  };

  const options = {
    title: 'Image Picker',
    mediaType: 'image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const openPicker = () => {
    console.log('=====> 1');
    launchImageLibrary(options, response => {
        console.log('=====> 2');
      // Use launchImageLibrary to open image gallery
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage(response.assets[0].uri);
        console.log(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.imageContainer}>
          {image == '' ? (
            <TouchableOpacity onPress={openPicker} style={styles.imageBox}>
              <Image
                source={require('./assets/favicon.png')}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={openPicker} style={styles.imageBox}>
              <Image
                resizeMode="center"
                style={{width: '100%', height: '100%'}}
                source={{
                  uri: image,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.imageContainer}>
          {image == '' ? (
            <TouchableOpacity onPress={openPicker} style={styles.imageBox}>
              <Image
                source={require('./assets/favicon.png')}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={openPicker} style={styles.imageBox}>
              <Image
                resizeMode="center"
                style={{width: '100%', height: '100%'}}
                source={{
                  uri: image,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#febe05',
    height: 45,
    marginVertical: 5,
    width: '95%',
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NewFile