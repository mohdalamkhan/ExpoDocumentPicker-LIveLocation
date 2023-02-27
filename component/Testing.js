import React from 'react';
import {View,Text, ActivityIndicator, Alert, TouchableOpacity} from  'react-native';
const Testing =()=>{

    return(
        <View>
            <Text style={{fontSize: 60, }}>Testing...</Text>
            <ActivityIndicator style={{fontSize:'20%'}}>

            </ActivityIndicator>

            <TouchableOpacity onPress={Alert.alert("Hello")}>
                <Text>Alert</Text>
            </TouchableOpacity>

        </View>
    )
} 

export default Testing;