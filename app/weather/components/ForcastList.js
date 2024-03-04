// ForecastList.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image, FlatList } from "react-native";
import moment from 'moment';

const styles = StyleSheet.create({
  dayContainer: {
    marginVertical: 10,
  },
  card: {
    backgroundColor: 'transparent',
    width: 85,
    height: 150,
    borderRadius: 37,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000', 
    marginRight: 13,
    borderWidth: 1, 
    borderColor: '#ECECEC', 
  },
  cardText: {
    fontSize: 18,
    color: '#ECECEC'
  }
});

const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  
const ForecastList = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => {
        const today = moment();
        const futureDate = today.clone().add(index, 'days');
        const dayOfWeek = futureDate.format('dddd');
        const dayCut = dayOfWeek.slice(0, 3);
        const dateCut = item.date.slice(0,3);
        const length = item.date.length;
        const monthCut = item.date.slice(3,length);
        
        return (
          <View style={styles.dayContainer}>
            <View style={[styles.card, { color: '#282F44' }]}>
              <Text style={[styles.cardText , { marginBottom: 10 }]}>{dayCut}</Text>
              <Text style={styles.cardText}>{dateCut},</Text>
              <Text style={[styles.cardText , { marginBottom: 10 }]}>{monthCut}</Text>
              <Text style={styles.cardText}>{convertKelvinToCelsius(item.average.main.temp)}°C</Text>
            </View>
          </View>
        );
      }}
      keyExtractor={(item) => item.day}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToInterval={200} 
      decelerationRate="fast"
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
      }}
    />
  );
};

export default ForecastList;
