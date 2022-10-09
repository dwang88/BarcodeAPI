import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Image, TouchableHighlight, Pressable } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as cheerio from 'cheerio';
import Card from './styles/card';
import { globalStyles } from './styles/global';




export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('N/A');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('N/A');
  const [text4, setText4] = useState('N/A');





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
    //console.log('Type: ' + type + '\nData: ' + data)

    const api_url = `https://world.openfoodfacts.org/api/v0/product/${data}.json`;

    async function getData(url){
      const response = await fetch(url);
      var ingredients = await response.json();
      const pre_filter = ingredients.product.ingredients_text.toLowerCase().replace(/\./g, '');
      const filter = pre_filter.split(", ");

      const mesh = ["red 40", "soy lecithin", "red#40", "natural flavors", "natural and artificial flavors", "caramel color", "fully hydrogenated vegetable oils", "aluminum", "palm oil", "corn syrup", "fructose", "glucose", "yellow 5", "yellow 6", "blue 1", "concentrate", "xanthan gum", "lecithin", "artificial", "monosodium glutamate", "acesulfame potassium" ];
      var filtered = [];
      setText(ingredients.product.ingredients_text);
      setText(pre_filter);
      setText2(ingredients.product.product_name_en_imported);
      setText3(ingredients.product.nutriscore_grade.toUpperCase());


      console.log("Pre: " + pre_filter);
      console.log(filter);

      for(let i = 0; i < filter.length; i++) {
        for(let j = 0; j < mesh.length; j++) {
            if(filter[i].includes(mesh[j])) {
              filtered.push(filter[i]);
            }
            else {
              filtered.push()
            }
        }
    }

    setText4(filtered);
    }
    getData(api_url);
  };

  const getBackgroundColor = () => {
    let color;
    if (text3 === 'C' || text3 === 'D' || text3 === 'E') {
        console.log(text3)
        color = 'red';
        console.log(color);
        return color;
    } else if (text3 === 'A' || text3 === 'B') {
      color = 'green';
      console.log(color);
      return color;
    } else {
      color = 'fff'
    }
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
    <ScrollView>
    <View style={{flexDirection: "column", padding: 10}}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 900, width: 400 }} 
          />
      </View>
      <Text style={{textAlign: 'center'}}>{text2}</Text>
      <Card>
        <Text style={styles.maintext}>{"Ingredients: " + text}</Text>
        </Card>
      <Card>
      <View style={{backgroundColor: getBackgroundColor(), borderRadius: 6}}>
        <Text style={styles.text3}>{"Nutriscore: " + text3 + " (A-E)"}</Text>
       </View>
      </Card>
      <Card>
        <Text>{"Hazards: " + text4}</Text>
      </Card>
      <View>{scanned &&
      <Pressable onPress={() => setScanned(false)} style={{backgroundColor: 'grey', borderRadius: 50, elevation: 3,
        backgroundColor: '#F8F8F8',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        borderWidth: 4,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        padding: 18,
        underlayColor: 'grey'
        }}><Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>SCAN</Text></Pressable>
      }
        </View>
    </View>
    </ScrollView>
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
    height: 200,
    alignSelf: 'stretch',
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
    marginTop: 30
  },
  text3: {
    textAlign: 'left',
    fontSize: 16,
    margin: 20,
    fontWeight: 'bold',
  }
});

//<View style={{borderRadius: "60px"}}>{scanned && <Button title={'Scan Again'} onPress={() => setScanned(false)} style={{borderRadius: '60px'}} color='black' />}</View>
