import React, {useState} from 'react';
import Card from './styles/card';
import {ScrollView, View, Image, Linking, Text, TouchableOpacity} from 'react-native';

export default function Nutrition() {
  return (
    <ScrollView>
      <View>
            <Text style={{padding: 20, fontSize: 18}}>The Nutri-Score is a nutrition label and rating system which returns the overall nutritional value of food products. It assigns products a rating letter from A (best) to E (worst) based on a three-step system.</Text>
      </View>
    </ScrollView>
  );
}
