import * as React from 'react';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'

import CountryDetails from './countryDetails'

const Stack = createStackNavigator();

export default function ThirdPage({ navigation }) {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const countriesObj = data;

  useEffect(() => {
    fetch('https://coronavirus-19-api.herokuapp.com/countries')
      .then((response) => response.json())
      .then((json) => {
        return setData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  function CountryCard({ navigation, countryName, countryCase, countryDetailsObj }) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Country Details', {
            countryDataObj: countryDetailsObj,
          });
        }}
        style={styles.countryCard}>
        <Text style={styles.nameOfCountry}>{countryName}</Text>
        <Text style={styles.resultCountry}>{countryCase}</Text>
      </TouchableOpacity>
    );
  }

  function formatResult(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  let [fontsLoaded] = useFonts({
    Langar: require('../Langar.ttf'),
  });

  let [googleFonts] = useFonts({
    GoogleFonts: require('../GoogleSans.ttf'),
  });

  function countryStats() {
    return (
      <View style={styles.container}>
        <View style={{ paddingTop: 8 }} />

        {isLoading == true ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator color="red" />
          </View>
        ) : (
            <FlatList
              data={countriesObj}
              renderItem={({ item }) => {
                return (
                  <CountryCard
                    navigation={navigation}
                    countryDetailsObj={item}
                    countryName={item.country}
                    countryCase={formatResult(item.cases)}
                  />
                );
              }}
              keyExtractor={(item) => item.country}
            />
          )}
      </View>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Country" component={countryStats} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Country Details" component={CountryDetails} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 15,
    paddingRight: 15
  },
  countryCard: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'orange',
    height: 60,
    marginTop: 8,
    borderRadius: 3,
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  nameOfCountry: {
    fontSize: 16,
    color: 'black'
  },
  resultCountry: {
    fontSize: 16,
    color: 'black'
  },
});