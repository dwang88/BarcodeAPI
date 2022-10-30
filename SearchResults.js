import React, {useState} from 'react';
import Card from './styles/card';
import {ScrollView, View, Image, Linking, Text, TouchableOpacity} from 'react-native';
import {useSearchStore} from './stores';

export default function SearchResults() {
  const search = useSearchStore((state) => state.search);
  const [json, setJson] = useState();

  async function getData() {
    let foodType = search.replace(/ /g, '_');
    let nutritionGrade = 'A';
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${foodType}&json=1`
    );
    var r = await res.json();
    setJson(r);
  }
  getData();
  return (
    <ScrollView>
      {json &&
        json.products.map((product, i) => {
          return (
            <TouchableOpacity onPress={() => Linking.openURL(product.url)} key={i}>
              <Card>
                <View style={{display: 'flex', alignItems: 'center'}}>
                  <Image style={{height: 100, width: 100}} source={{uri: product.image_url}} />
                  <Text>{product.product_name}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          );
        })}
      {!json && (
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Text>Searching...</Text>
        </View>
      )}
    </ScrollView>
  );
}
