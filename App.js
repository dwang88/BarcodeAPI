import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as cheerio from 'cheerio';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('N/A');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('N/A');
  const none = "none";



  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)

    const api_url = `https://world.openfoodfacts.org/api/v0/product/${data}.json`;

    async function getData(url){
      const response = await fetch(url);
      var ingredients = await response.json();
      console.log(ingredients.product.ingredients_text)
      setText(ingredients.product.ingredients_text)
      setText2(ingredients.product.product_name_en_imported)
      setText3(ingredients.product.nutriscore_grade.toUpperCase())
    }
    getData(api_url)
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
      )
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>
      )
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 600, width: 400 }} />
      </View>
      <Text>{text2}</Text>
      <Text style={styles.maintext}>{"Ingredients: " + text}</Text>
      <Text style={styles.text3}>{"Nutriscore: " + text3 + " (A-E)"}</Text>  

      {scanned && <Button title={'Scan Again'} onPress={() => setScanned(false)} color='black' />}
    </View>
  );
}

const $ = cheerio.load('<div id="ingredients_list">...</div>', null, false);




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  },
  text3: {
    textAlign: 'left',
    fontSize: 16,
    margin: 20,
  }
});
