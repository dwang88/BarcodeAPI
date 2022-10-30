import React, {useState, useRef, useEffect} from 'react';
import Card from './styles/card';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import {Searchbar, Checkbox, Button, Menu, Divider} from 'react-native-paper';
import {useSearchStore} from './stores';
import Icon from 'react-native-vector-icons/FontAwesome';
var styles = StyleSheet.create({
  filter: {
    transform: [{translateX: -Dimensions.get('window').width * 0.08}],
  },
});

export default function HomeScreen({navigation}) {
  const search = useSearchStore((state) => state.search);
  const nutriFilter = useSearchStore((state) => state.nutriFilter);
  const ecoFilter = useSearchStore((state) => state.ecoFilter);

  const [searched, setSearched] = useState(false);
  const [visible, setVisible] = useState(true);

  const onMountRef = useRef(false);
  useEffect(() => {
    if (onMountRef.current === false) {
      onMountRef.current = true;
      return;
    }
    setSearched(false);
    navigation.navigate('Search');
  }, [searched]);

  return (
    <View style={{flexDirection: 'column', padding: 10}}>
      <Card>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Searchbar
            style={{backgroundColor: '#FFF5E4', elevation: 0, width: '100%', height: '100%', padding: 0}}
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
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={<Button icon='dots-vertical' style={styles.filter} onPress={() => setVisible(true)}></Button>}
          >
            <Menu.Item title='Filter by:' />
            <Divider />
            <Checkbox.Item
              label='Nutriscore'
              status={nutriFilter ? 'checked' : 'unchecked'}
              onPress={() => {
                useSearchStore.setState({nutriFilter: !nutriFilter});
              }}
            />

            <Checkbox.Item
              label='Ecoscore'
              status={ecoFilter ? 'checked' : 'unchecked'}
              onPress={() => {
                useSearchStore.setState({ecoFilter: !ecoFilter});
              }}
            />
          </Menu>
        </View>
      </Card>
      <Card>
        <Pressable
          onPress={() => navigation.navigate('Camera')}
          style={{
            borderRadius: 5,
            marginHorizontal: 4,
            marginVertical: 6,
            padding: 8,
          }}
        >
          <Text style={{textAlign: 'center', fontSize: 18, color: 'black', opacity: 0.52, textAlign: 'left'}}>
            🔗 Scan Items
          </Text>
        </Pressable>
      </Card>
      <Card>
        <Pressable
          onPress={() => navigation.navigate('Nutrition')}
          style={{
            borderRadius: 5,
            marginHorizontal: 4,
            marginVertical: 6,
            padding: 8,
          }}
        >
          <Text style={{textAlign: 'center', fontSize: 18, color: 'black', opacity: 0.52, textAlign: 'left'}}>
            🗒 Nutritional Information
          </Text>
        </Pressable>
      </Card>
      <Card>
        <Pressable
          onPress={() => navigation.navigate('Environment')}
          style={{
            borderRadius: 5,
            marginHorizontal: 4,
            marginVertical: 6,
            padding: 8,
          }}
        >
          <Text style={{textAlign: 'center', fontSize: 18, color: 'black', opacity: 0.52, textAlign: 'left'}}>
            ♻️ Environmental Information
          </Text>
        </Pressable>
      </Card>
    </View>
  );
}
