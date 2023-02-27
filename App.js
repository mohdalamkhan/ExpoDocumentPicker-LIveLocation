// import { View, Text, SafeAreaView } from 'react-native'
// import React from 'react'
// // import CameraGeoLocation from './component/CameraGeoLocation'
// // import SelectDocument from './component/SelectDocument';
// import CameraTest from './component/CameraTest'

// const App = () => {
//   return (
//     <SafeAreaView>
//       {/* <SelectDocument/> */}
//       {/* <CameraGeoLocation/> */}

//       {/* Working Camera with Location */}
//     <CameraTest/>
//     </SafeAreaView>
//   )
// }

// export default App

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
const App = () => {
  // state to hold location
  const [location, setLocation] = useState(false);
  // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };
  // Function to Send Location to twitter
  const sendLocation = () => {
    try {
      if (location) {
        const tweet = `latitude is ${location.coords.latitude} and longitude is ${location.coords.longitude}`;
        const url = `https://twitter.com/intent/tweet?text=${tweet}`;
        Linking.openURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location" onPress={getLocation} />
      </View>
      <Text>Latitude: {location ? location.coords.latitude : null}</Text>
      <Text>Longitude: {location ? location.coords.longitude : null}</Text>
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Send Location" onPress={sendLocation} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;



// // This code is not working from another component.

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as Location from 'expo-location';

// const CameraTest =()=> {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [cameraRef, setCameraRef] = useState(null);
//   const [hasLocationPermission, setHasLocationPermission] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [photoUri, setPhotoUri] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status: cameraStatus } = await Camera.requestMicrophonePermissionsAsync();
//       setHasCameraPermission(cameraStatus === 'granted');

//       const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
//       setHasLocationPermission(locationStatus === 'granted');

//       if (locationStatus === 'granted') {
//         const { coords } = await Location.getCurrentPositionAsync({});
//         setLocation(coords);
//       }
//     })();
//   }, []);

//   const takePicture = async () => {
//     if (cameraRef) {
//       const options = { quality: 0.5, base64: true };
//       const photo = await cameraRef.takePictureAsync(options);

//       if (location) {
//         console.log(photo.uri); // do something with the photo URI and location data
//         console.log(location);
//         setPhotoUri(photo.uri);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {hasCameraPermission === null || hasLocationPermission === null ? (
//         <View />
//       ) : hasCameraPermission === false || hasLocationPermission === false ? (
//         <Text>No access to camera or location</Text>
//       ) : (
//         <View style={styles.cameraContainer}>
//           <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={setCameraRef} />
//           {photoUri && (
//             <View style={styles.thumbnailContainer}>
//               <Image style={styles.thumbnail} source={{ uri: photoUri }} />
//             </View>
//           )}
//           <TouchableOpacity style={styles.button} onPress={takePicture}>
//             <Text style={styles.buttonText}>Take Picture</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// }

// export default CameraTest

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cameraContainer: {
//     flex: 1,
//     width: '100%',
//   },
//   camera: {
//     flex: 1,
//   },
//   thumbnailContainer: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     width: 100,
//     height: 100,
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   thumbnail: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   button: {
//     backgroundColor: 'white',
//     borderRadius: 5,
//     padding: 15,
//     alignSelf: 'center',
//     margin: 20,
//   },
//   buttonText: {
//     fontSize: 20,
//     color: 'black',
//   },
// });






// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as Location from 'expo-location';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import ImagePreviewScreen from './component/ImagePrivewScreen';

// const Stack = createStackNavigator();

// export default function App() {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [cameraRef, setCameraRef] = useState(null);
//   const [hasLocationPermission, setHasLocationPermission] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [photoUri, setPhotoUri] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
//       setHasCameraPermission(cameraStatus === 'granted');

//       const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
//       setHasLocationPermission(locationStatus === 'granted');

//       if (locationStatus === 'granted') {
//         const { coords } = await Location.getCurrentPositionAsync({});
//         setLocation(coords);
//       }
//     })();
//   }, []);

//   const takePicture = async () => {
//     if (cameraRef) {
//       const options = { quality: 0.5, base64: true };
//       const photo = await cameraRef.takePictureAsync(options);

//       if (location) {
//         console.log(photo.uri); // do something with the photo URI and location data
//         console.log(location);
//         setPhotoUri(photo.uri);
//         navigation.navigate('ImagePreview', { photoUri: photo.uri }); // navigate to the ImagePreviewScreen
//       }
//     }
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Camera">
//         <Stack.Screen
//           name="Camera"
//           options={{ headerShown: false }}
//           component={() => (
//             <View style={styles.container}>
//               {hasCameraPermission === null || hasLocationPermission === null ? (
//                 <View />
//               ) : hasCameraPermission === false || hasLocationPermission === false ? (
//                 <Text>No access to camera or location</Text>
//               ) : (
//                 <View style={styles.cameraContainer}>
//                   <Camera style={styles.camera} ref={ref => setCameraRef(ref)} />
//                   <View style={styles.buttonContainer}>
//                     <TouchableOpacity style={styles.button} onPress={takePicture}>
//                       <Text style={styles.buttonText}>Take Picture</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               )}
//             </View>
//           )}
//         />
//         <Stack.Screen name="ImagePreview" component={ImagePreviewScreen} options={{ title: 'Image Preview' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cameraContainer: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     fontSize: 20,
//     color: 'red',
//   }
// });
























// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as Location from 'expo-location';

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraRef, setCameraRef] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [photoUri, setPhotoUri] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');

//       const { coords } = await Location.getCurrentPositionAsync({});
//       setLocation(coords);
//     })();
//   }, []);

//   const takePicture = async () => {
//     if (cameraRef) {
//       const options = { quality: 0.5, base64: true };
//       const photo = await cameraRef.takePictureAsync(options);

//       if (location) {
//         console.log(photo.uri); // do something with the photo URI and location data
//         console.log(location);
//         setPhotoUri(photo.uri);
//       }
//     }
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }

//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }


  
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{alignItems:'center', margin:'3%'}}>
//         <Text style={{fontSize:18, color: 'blue'}}>Select Your Document</Text>
      
      
//       </View>


//     <View style={{width: '100%', height:'40%', backgroundColor:'yellow',
//      flexDirection: 'row'}}>
//       <View style={{alignItems:'center', margin:'3%',}} >      
//       <TouchableOpacity onPress={takePicture}>
//         <Text >Take Picture</Text>
//       </TouchableOpacity> 
//       </View>
      

//       <View style={{backgroundColor:'red', width:'50%', height:'20%'}}>
//       <Camera  type={Camera.Constants.Type.back} ref={ref => setCameraRef(ref)} />
//         {photoUri && (
//           <Image style={styles.thumbnail} source={{ uri: photoUri }} />
//         )}
//         </View>

//         </View>

//       </SafeAreaView>
  
//     // <View style={styles.container} >
//     //   <View style={styles.container}>
//     //     <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={ref => setCameraRef(ref)} />
//     //     {photoUri && (
//     //       <Image style={styles.thumbnail} source={{ uri: photoUri }} />
//     //     )}
//     //   </View>
//       // <TouchableOpacity style={styles.button} onPress={takePicture}>
//       //   <Text style={styles.buttonText}>Take Picture</Text>
//       // </TouchableOpacity>
//     // </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   cameraContainer: {
//     // flex:1,
//     width: '100%',
//     height: '30%',
//   },
//   camera: {
//     flex: 1,
//     // width: '100%',
//     // height: '30%',
//   },
//   thumbnail: {
//     position: 'absolute',
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     alignSelf: 'center',
//     bottom: 20,
//     right: 20,
//     width: 70,
//     height: 50,
//   },
//   button: {
//     backgroundColor: 'white',
//     borderRadius: 5,
//     padding: 15,
//     alignSelf: 'center',
//     margin: 20,
//   },
//   buttonText: {
//     fontSize: 20,
//     color: 'black',
//   },
// });


















// import { View, Text, FlatList } from 'react-native'
// import React, { useState } from 'react'
// import axios from 'axios'
// // const baseUrl = 'https://reqres.in';

// const App = () => {
//   const [data, setData] =useState({});
// axios({
//   method:'get',
//   url: 'https://jsonplaceholder.typicode.com/todos/1',
// }).then((response)=>{
//   console.log(response.data);
//   setData(response.data.title)
// })
// // axios.get(`${baseURL}/api/users/1`).then((response)=>{
// //   console.log(response.data);
// // });

//   return (
//       <View>
//         <Text>{title}</Text>
//       </View>
//   )
// }

// import React from 'react'
// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

// export default Profile = () => {

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}></View>
//       <Image
//         style={styles.avatar}
//         source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
//       />
//       <View style={styles.body}>
//         <View style={styles.bodyContent}>
//           <Text style={styles.name}>John Doe</Text>
//           <Text style={styles.info}>UX Designer / Mobile developer</Text>
//           <Text style={styles.description}>
//             Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis,
//             omittam deseruisse consequuntur ius an,
//           </Text>

//           <TouchableOpacity style={styles.buttonContainer}>
//             <Text>Opcion 1</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.buttonContainer}>
//             <Text>Opcion 2</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: '#00BFFF',
//     height: 200,
//   },
//   avatar: {
//     width: 130,
//     height: 130,
//     borderRadius: 63,
//     borderWidth: 4,
//     borderColor: 'white',
//     marginBottom: 10,
//     alignSelf: 'center',
//     position: 'absolute',
//     marginTop: 130,
//   },
//   name: {
//     fontSize: 22,
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   body: {
//     marginTop: 40,
//   },
//   bodyContent: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 30,
//   },
//   name: {
//     fontSize: 28,
//     color: '#696969',
//     fontWeight: '600',
//   },
//   info: {
//     fontSize: 16,
//     color: '#00BFFF',
//     marginTop: 10,
//   },
//   description: {
//     fontSize: 16,
//     color: '#696969',
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     marginTop: 10,
//     height: 45,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     width: 250,
//     borderRadius: 30,
//     backgroundColor: '#00BFFF',
//   },
// })
