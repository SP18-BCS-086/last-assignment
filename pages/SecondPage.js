import * as React from 'react';
import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'

const getData = async () => {
    const value = await AsyncStorage.getItem('value.country')
    if(value !== null) {
      return (value)
    }
}

export default function SecondPage() {
    return (
        <View>
          <Text>{getData}</Text>
        </View>
    );
}