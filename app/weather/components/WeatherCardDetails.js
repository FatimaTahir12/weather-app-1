import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedWeatherItem } from '../weatherSlice';

const WeatherCardDetails = ({ weatherItem, selectedWeatherItem }) => {
  const dispatch = useDispatch();

  const tempUnit = useSelector((state) => state.weather.tempUnit);
  const unit = tempUnit === 'celsius' ? '°C' : '°F';

  const [openTemperature, setOpenTemperature] = useState(false);
  const [openPressure, setOpenPressure] = useState(false);
  const [openHumidity, setOpenHumidity] = useState(false);

  const handleClickTemperature = () => {
    setOpenTemperature(!openTemperature);
  };

  const handleClickPressure = () => {
    setOpenPressure(!openPressure);
  };

  const handleClickHumidity = () => {
    setOpenHumidity(!openHumidity);
  };

  const getWindDirection = (degree) => {
    const directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE'];
    const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  return (
    <View key={weatherItem.date} style={styles.container}>
      <View
        style={[
          styles.paper,
          { elevation: selectedWeatherItem?.date === weatherItem.date ? 8 : 1 },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            dispatch(
              setSelectedWeatherItem({
                selectedWeatherItem: weatherItem,
              })
            );
          }}
          style={styles.listItem}
        >
          
        </TouchableOpacity>
        {/* Rest of your JSX code... */}
        <Text>AAAAAAAAAAAAssA</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      width: 280,
      marginBottom: 16,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    headerText: {
      marginLeft: 8,
      fontSize: 16,
    },
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    listItemContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    listItemText: {
      marginLeft: 12,
      fontSize: 16,
    },
  });
  
export default WeatherCardDetails;
