import React, { useState } from "react";
import {
  View,
  Button,
  FlatList,
  Text,
  SafeAreaView,
  Image,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default  SelectDocument =()=> {
  const [documents, setDocuments] = useState([]);

  const pickDocuments = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      multiple: true,
      copyToCacheDirectory: true,
      // allowMultiSelection: true,
    });

    if (result.type === "success") {
      setDocuments([...documents, result]);
      console.log("result", result);
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
      <Image source={{ uri: item.uri}} 
      style={{ height: 40, width: 70, backgroundColor:'gray', margin: 10 }} />
    </View>
  );

  return (
    <SafeAreaView>
      <Button title="Pick Documents" onPress={pickDocuments} />
      <FlatList
        data={documents}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

