/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useSelector } from "react-redux";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useGetWeatherByCityQuery } from './services/getWeather';
import CitySetter from "./weather/components/CitySetter";
import WeatherForecast from "./weather/components/WeatherForecast";

interface RootState {
  weather: {
    city: string;
    tempUnit: string;
    pageIndex: number;
    selectedWeatherItem: any; // Replace 'any' with the actual type
    location: any; // Replace 'any' with the actual type
  };
}

const App = () => {
 
  const city = useSelector((state: RootState) => state.weather.city);
  const getWeatherQuery = () => useGetWeatherByCityQuery(city);
  return (
    <View style={styles.container}>
      <CitySetter/>
      {(city) && (
          <WeatherForecast getWeatherQuery={getWeatherQuery}/>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282F44',
  }
});

export default App;
