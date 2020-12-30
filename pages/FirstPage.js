import axios from 'axios';
import * as React from 'react';
import { StyleSheet, Image, ActivityIndicator, FlatList, TouchableOpacity, Button, View, Text, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { material } from 'react-native-typography';
import Ionicons from 'react-native-vector-icons/Ionicons'

const FirstPage = ({ navigation }) => {

  const [loading, isLoading] = useState(true);
  const [dataSource, setDataSource] = useState({});

  const options = {
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/totals',
    headers: {
      'x-rapidapi-key': 'b23483d96dmsh939d0eb98ca8f3bp1418c6jsna8a6a91bd549',
      'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      isLoading(false);
      setDataSource(response.data);
      console.log(dataSource);
    })
    .catch(function (error) {
      console.error(error);
    });
  {
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      );
    }
  }
  {
    if (!loading) {
      return (
        <View style={styles.container}>
          <FlatList
            data={dataSource}
            renderItem={({ item }) => 
              <View style={styles.container}>
                <Text style={material.headline}>
                {"\n"}Worldwide statistics{"\n"}{"\n"}
            </Text>
            <Text style={material.subheading}>
            Confirmed cases: {item.confirmed}{"\n"}{"\n"}
            Total recovered: {item.recovered}{"\n"}{"\n"}
            Critical cases: {item.critical}{"\n"}{"\n"}
            Total deaths: {item.deaths}
            </Text>
          </View>
            }>
</FlatList>

<View
  style={{
    marginTop: 10,
    marginBottom: 80,
    borderBottomColor: 'brown',
    borderBottomWidth: 3,
  }}
/>


        </View>
        
      );
    }
  }
};

export default FirstPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    textAlign: 'center',
  }
});