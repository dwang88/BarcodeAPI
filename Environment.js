import React, {useState} from 'react';
import Card from './styles/card';
import {ScrollView, View, Image, Linking, Text, TouchableOpacity} from 'react-native';

export default function Enviornment() {
  return (
    <ScrollView>
      <View>
        <Text style={{padding: 20, fontSize: 18}}>
          The Eco-Score is an experimental score that summarizes the environmental impacts of food products. It assigns
          products a rating letter from A (best) to E (worst) which summarizes the effect that the product had on 15
          environmental impacts including carbon footprint, air pollution and water use.
        </Text>
      </View>
    </ScrollView>
  );
}
