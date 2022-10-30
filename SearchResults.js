import React, {useEffect, useState} from 'react';
import Card from './styles/card';
import {ScrollView, View, Image, Linking, Text, TouchableOpacity} from 'react-native';
import {useSearchStore} from './stores';

export default function SearchResults() {
  const search = useSearchStore((state) => state.search);
  const nutriFilter = useSearchStore((state) => state.nutriFilter);
  const ecoFilter = useSearchStore((state) => state.ecoFilter);

  const [json, setJson] = useState();

  async function getData() {
    let foodType = search.replace(/ /g, '_');
    let num = 1;
    let str = `https://world.openfoodfacts.org/cgi/search.pl?action=process&json=1&tagtype_0=categories&tag_contains_0=contains&tag_0=${foodType}`;
    if (nutriFilter) {
      str += `&tagtype_1=nutrition_grades&tag_contains_1=contains&tag_1=A`;
      num++;
    }
    if (ecoFilter) str += `&tagtype_${num}=ecoscore_grade&tag_contains_${num}=contains&tag_${num}=A`;
    const res = await fetch(str);

    let r = await res.json();
    setJson(r);
  }
  useEffect(() => {
    getData();
  }, []);

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
