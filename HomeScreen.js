import React, {useState, useRef, useEffect} from 'react';
import Card from './styles/card';
import {Button, View, Text, Pressable} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useSearchStore} from './stores';

export default function HomeScreen({navigation, search, setSearch}) {
  const clear = useSearchStore((state) => state.clear);

  const [searched, setSearched] = useState(false);
  const onMountRef = useRef(false);

  useEffect(() => {
    if (onMountRef.current === false) {
      onMountRef.current = true;
      return;
    }
    setSearched(false);
    clear();
    navigation.navigate('Search');
  }, [searched]);
  return (
    <View style={{flexDirection: 'column', padding: 10}}>
      <Card>
        <Searchbar
          style={{backgroundColor: '#FFF5E4', elevation: 0}}
          onBlur={() => setSearched(true)}
          placeholder='Search for products'
          value={search}
          onChangeText={(search) => {
            useSearchStore.setState({search: search});
          }}
          onIconPress={() => {
            setSearched(true);
          }}
        />
      </Card>
      <Card>
        <Pressable onPress={() => navigation.navigate('Camera')} style={{
          borderRadius: 5, 
          marginHorizontal: 4,
          marginVertical: 6,
          padding: 8,
          }}><Text style={{textAlign: 'center', fontSize: 18, color: 'black', opacity: .52, textAlign: 'left'}}>🔗    Scan Items</Text>
        </Pressable>
      </Card>
      <Card>
        <Pressable onPress={() => navigation.navigate('Nutrition')} style={{
          borderRadius: 5, 
          marginHorizontal: 4,
          marginVertical: 6,
          padding: 8,
          }}><Text style={{textAlign: 'center', fontSize: 18, color: 'black', opacity: .52, textAlign: 'left'}}>🗒    Nutritional Information</Text>
        </Pressable>
      </Card>
      <Card>
        <Pressable onPress={() => navigation.navigate('Environment')} style={{
          borderRadius: 5, 
          marginHorizontal: 4,
          marginVertical: 6,
          padding: 8,
          }}><Text style={{textAlign: 'center', fontSize: 18, color: 'black', opacity: .52, textAlign: 'left'}}>♻️    Environment Information</Text>
        </Pressable>
      </Card>
    </View>
  );
}
