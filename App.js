import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import axios from 'axios';

export default function TextInputs() {
  const [name, setnameInput] = useState('');
  const [price, setpriceInput] = useState('');
  const [stock, setstockInput] = useState('');

  const [data, setData] = useState([]);

  const adding = async () => {
    try {
      let newAreaData = { name, price, stock };
      setData([...data, newAreaData]);
      setnameInput('');
      setpriceInput('');
      setstockInput('');
  
      const urlPost = 'https://northwind.vercel.app/api/products';
      const requestData = {
        Name: name,
        Price: price,
        Stock: stock,
      };
  
      const response = await axios.post(urlPost, requestData);
      Alert.alert('Ürün eklendi ve gönderildi.');
    } catch (error) {
      Alert.alert('Hata');
    }
  };
  

  const clear = () => {
    setData([]);}

    function priceColor(a) {
      if (a >= 50) {
        return 'red';
      } else {
        return 'black';
      }
    }
    
  
    

  return (
   
    <SafeAreaView style={styles.safearea}>
      
      <View style={styles.statBar}>
        <Text style={{ color: 'white', fontSize: 24 }}>ODEV</Text>
         </View>
      <View style={{flex:1}}> 
     
      <TextInput style={styles.orign} placeholder="Ürün adı girin:" onChangeText={setnameInput} value={name}/>
      <TextInput style={styles.orign} placeholder="Ürün fiyatı girin:" onChangeText={setpriceInput} value={price}/>
      <TextInput style={styles.orign} placeholder="Ürün miktarı girin:"  onChangeText={setstockInput} value={stock}/>

      <View style={styles.touchViewArea}>
        <TouchableOpacity onPress={adding} style={styles.addbuttonDesign}>
          <Text style={styles.buttonText}>Ekle</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={clear} style={styles.clearbuttonDesign}>
          <Text style={styles.buttonText}>Sil</Text>
        </TouchableOpacity>
        </View>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{ height: 90, marginTop: 10, marginBottom: 10, flex: 0.5 }}>
            <Text style={[styles.navText, { color: priceColor(item.price) }]}>Ürün Adı: {item.name}</Text>
            <Text style={[styles.navText, { color: priceColor(item.price) }]}>Ürün Fiyatı: {item.price}</Text>
            <Text style={[styles.navText, { color: priceColor(item.price) }]}>Ürün Adedi: {item.stock}</Text>
          </View>
        )}
      />
</View>
      <View style={styles.navBar}>
        <Text style={{ color: 'white' }}>Yapımcı: K.A.</Text>
      </View>
      </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  orign: {
    height: 40,
    margin: 12,
    borderWidth: 3,
    padding: 10,
  },
  safearea: {
    flex: 1,
  },
  areaView: {
    
  },
  statBar: {
     
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131313',
    marginBottom: 15,
  },
  addbuttonDesign: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131313',
    width: 50,
    height: 40,
    marginLeft: 15,
    borderRadius: 20,
  },
  clearbuttonDesign: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 40,
    marginRight: 15,
    backgroundColor: '#131313',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  navBar:{
    height: 40,
     backgroundColor: '#131313',
     justifyContent: 'center',
     alignItems: 'center',
  },
  navText:{
    fontSize:20,
   
  },
  flatViewArea:{
    borderWidth: 3,
    height:200,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  touchViewArea:{
    
    flexDirection: 'row',
    marginBottom:20,
    marginTop: 20,
  },
  
});
