import React, {useState,useEffect} from 'react';

import {View, Text,  Button} from 'react-native';
import Product from './component/Product';
function App (){
const [count, setCount ] = useState(0)
const [data,setData] = useState("No data")

// No need of useEffect
// useEffect(()=>{
//   console.warn("use effect", count)
//   if(count==5){
//     setData("New data filled")
//   }
// })

return( 
<View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
{/* Comment for now */}
{/* <Button  title= "Counting in minus" onPress={()=>setCount(count -1)}/> */}

{/* <Text style={{fontSize:60}}> {data} </Text> */}

<View style={{width:'100%',height:'8%',backgroundColor:'skyblue'}}>
<Button   title= "Counting in Plus" onPress={()=>setCount(count +1)}/>
</View>

{/* <Text style={{fontSize:60}}> {count} </Text> */}
{/* In this is text first count is a  props and second one is state of this page */}
<Product data={data}/>
</View>);
}

export default App;