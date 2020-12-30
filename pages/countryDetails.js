import * as React from 'react';
import { useFonts } from 'expo-font';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CountryDetails({ navigation, route }) {
  const countryData = route.params.countryDataObj;
  const [addSave, setAddSave] = useState(false);

  function ResultCard({ resultType, stats }) {
    return (
      <View style={styles.resultCard}>
        <Text style={styles.resultType}>{resultType}</Text>
        <Text style={styles.stats}>{stats}</Text>
      </View>
    );
  }

  let [fontsLoaded] = useFonts({
    Langar: require('../Langar.ttf'),
  });

  let [googleFonts] = useFonts({
    GoogleFonts: require('../GoogleSans.ttf'),
  });

  function formatResult(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  const storeData = async (value) => {
      const jsonValue = JSON.stringify(value);
      console.log(value.country)
      await AsyncStorage.setItem(value.country, jsonValue);
  }

  const removeData = async (value) => {
      await AsyncStorage.removeItem(value.country);
  }

  const addToSave = (value) => {
    if (!addSave) {
      storeData(value);
      setAddSave(!addSave);
    }

    else {
      removeData(value);
      setAddSave(!addSave);
    }
    
  }

  if (!fontsLoaded) {
    return <View style={{ backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', flex: 1 }}><Text>Loading</Text></View>
  }
  return (
    <View style={styles.container}>
      <View style={styles.countryNameView}>
        <Text style={styles.countryName}>{countryData.country}</Text>
        
        <Pressable onPress={() => addToSave(countryData)}>
        {({ pressed }) => (
          <Text style={styles.text}>
            {pressed ? 'Saved!' : 'Save'}
          </Text>
        )}
        </Pressable>

      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ResultCard
          resultType={'Cases'}
          stats={formatResult(countryData.cases)}
        />
        <ResultCard
          resultType={'Cases today'}
          stats={formatResult(countryData.todayCases)}
        />
      </View>
      <View style={{ paddingTop: 10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ResultCard
          resultType={'Deaths'}
          stats={formatResult(countryData.deaths)}
        />
        <ResultCard
          resultType={'Deaths today'}
          stats={formatResult(countryData.todayDeaths)}
        />
      </View>
      <View style={{ paddingTop: 10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ResultCard
          resultType={'Recovered cases'}
          stats={formatResult(countryData.recovered)}
        />
        <ResultCard
          resultType={'Active cases'}
          stats={formatResult(countryData.active)}
        />
      </View>
      <View style={{ paddingTop: 10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ResultCard
          resultType={'Critical cases'}
          stats={formatResult(countryData.critical)}
        />
        <ResultCard
          resultType={'Tests done'}
          stats={formatResult(countryData.totalTests)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  countryName: {
    fontSize: 30,
    color: 'black',
  },
  countryNameView: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  resultCard: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 100,
  },
  resultType: {
    fontSize: 16,
    color: 'black',
    fontWeight: '100'
  },
  stats: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold'
  },
});