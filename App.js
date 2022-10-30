import React, {useState} from 'react';
import SearchResults from './SearchResults';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Camera from './Camera';
import HomeScreen from './HomeScreen';
import Nutrition from './Nutrition';
import create from 'zustand';
import Environment from './Environment';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='home'
          component={HomeScreen}
          options={{
            title: 'Food Checker',
            headerStyle: {
              backgroundColor: '#F2F2F2',
            },
          }}
        />
        <Stack.Screen
          name='Camera'
          component={Camera}
          options={{
            title: 'Scan Items',
            headerStyle: {
              backgroundColor: '#F2F2F2',
            },
          }}
        />
        <Stack.Screen
          name='Search'
          component={SearchResults}
          options={{
            title: 'Item Search',
            headerStyle: {
              backgroundColor: '#F2F2F2',
            },
          }}
        />
        <Stack.Screen
          name='Nutrition'
          component={Nutrition}
          options={{
            title: 'Nutritional Information',
            headerStyle: {
              backgroundColor: '#F2F2F2',
            },
          }}
        />
        <Stack.Screen
          name='Environment'
          component={Environment}
          options={{
            title: 'Environment Information',
            headerStyle: {
              backgroundColor: '#F2F2F2',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
