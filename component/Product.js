import React, {useEffect} from 'react';
import {View,Text} from  'react-native';
const Product =(props)=>{
useEffect(()=>{
console.warn("Props",props)
})
    return(
        <View>
            <Text style={{fontSize: 60, }}>{props.data}</Text>
        </View>
    )
} 

export default Product;