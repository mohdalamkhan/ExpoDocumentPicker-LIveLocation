import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity} from 'react-native'
import React,{useState} from 'react'

const App = () => {
  const [data, setData] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ])

const onSelect = INDEX =>{
  const tempData = [];
  data.map((item,index)=>{
     if(index == INDEX){
      if(item == true){
        tempData.push(false)
      }
      else{
        tempData.push(true)
      }
     }
     else{
      if(item == true){
        tempData.push(true)
      }
      else{
        tempData.push(false)
      }
     }
  })
  setData(tempData)
}


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item,index})=>{
          return(
            <TouchableOpacity onPress={()=>{
              onSelect(index)
            }}
              style={{ width: '100%', height: 100, padding:'2%',
              justifyContent: 'center', alignItems: 'center',
              borderWidth: 0.5,
              backgroundColor: item == true ? 'green' : 'white',
              // borderWidth: item == true ? 1 : 0
            }}
            >
              {/* <Text style={{fontSize:18}}>{'Item ' + index}</Text> */}
             
              <Text style={{fontSize:20}}>{'Item' + (index+1)}</Text>
            </TouchableOpacity>
          )
        }}
      />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
  }
})

