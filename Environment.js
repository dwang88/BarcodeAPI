import React, {useState} from 'react';
import Card from './styles/card';
import {ScrollView, View, Image, Linking, Text, TouchableOpacity} from 'react-native';

export default function Enviornment() {
  return (
    <ScrollView>
      <View>
            <Text style={{padding: 20, fontSize: 18}}>The Eco-Score is an experimental score that summarizes the environmental impacts of food products. </Text>
      </View>
    </ScrollView>
  );
}
