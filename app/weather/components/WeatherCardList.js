import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import WeatherCardDetails from "./WeatherCardDetails";
import { setSelectedWeatherItem } from "../weatherSlice";
import { useSelector, useDispatch } from "react-redux";

const WeatherCardList = ({ weatherItems }) => {
  const dispatch = useDispatch();

  const selectedWeatherItem = useSelector(
    (state) => state.weather.selectedWeatherItem
  );

  useEffect(() => {
    if (selectedWeatherItem) {
      const _selectedWeatherItem = weatherItems.find((weatherItem) => {
        return weatherItem.date === selectedWeatherItem.date;
      });
      if (_selectedWeatherItem) {
        dispatch(
          setSelectedWeatherItem({ selectedWeatherItem: _selectedWeatherItem })
        );
      }
    }
  }, [weatherItems]);

  const renderItem = ({ item }) => (
    <WeatherCardDetails
      weatherItem={item}
      selectedWeatherItem={selectedWeatherItem}
  />
  );

  return (
    <View style={styles.container}>
        
      <FlatList
        data={weatherItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.date}
        horizontal={false} // Adjust based on your design
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
});

export default WeatherCardList;
