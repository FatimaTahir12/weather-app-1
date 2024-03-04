import React from "react";

import { useState } from "react";
import { useSelector } from "react-redux";
import { getWeatherListByDays } from "../../utils/getWeatherListByDays";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'flex-end', 
    marginTop: 12,
  },
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
  headerText: {
    fontSize: 38,
    left: 10,
    color: '#fff',
    textAlign: 'left',
  },
  normal: {
    fontSize: 18,
    left: 10,
    color: '#fff',
    textAlign: 'left',
  },
  main_temp: {
    fontSize: 80,
    left: 5,
    
    fontWeight: 'bold',
    color: '#E6AF2E'
  },
  details_container: {
    marginTop: 25,
    marginBottom: 13,
  },
  cardText: {
    fontSize: 18,
    color: '#ECECEC'
  }
});

const convertKelvinToCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(1);
};


var date = moment().format('dddd');
console.log(date);



const WeatherForecast = ({ getWeatherQuery }) => {


  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const tempUnit = useSelector((state) => state.weather.tempUnit);
  const pageIndex = useSelector((state) => state.weather.pageIndex);

  const { data, error, isLoading, isFetching, isSuccess, isError } = getWeatherQuery();

  if (isError) {
    return <Text>{error.data?.message || error.message}</Text>;
  }
  if (isLoading) return <Text>Loading...</Text>;
  if (isFetching) return <Text>Fetching...</Text>;
  if (!isSuccess) return <Text>Error while fetching weather</Text>;

  const cardsPerPage = 2;
  const pageStart = pageIndex * cardsPerPage;
  const pageEnd = pageStart + cardsPerPage;

  const weatherList = getWeatherListByDays(data.list, tempUnit);
  const weatherItems = weatherList.slice(pageStart, pageEnd);
  const ICON = data.list[0].weather[0].icon;
  
  const handleTemperatureClick = () => {
    setTemperatureUnit((prevUnit) => {
      switch (prevUnit) {
        case "celsius":
          return "kelvin";
        case "kelvin":
          return "fahrenheit";
        case "fahrenheit":
          return "celsius";
        default:
          return "celsius";
      }
    });
  };

  const renderTemperature = (temperature) => {
    switch (temperatureUnit) {
      case "celsius":
        return `${convertKelvinToCelsius(temperature)}°C`;
      case "kelvin":
        return `${temperature.toFixed(1)}K`;
      case "fahrenheit":
        return `${(((temperature - 273.15) * 9) / 5 + 32).toFixed(1)}°F`;
      default:
        return `${convertKelvinToCelsius(temperature)}°C`;
    }
  };

  const iconMapping = {
    '01d': require('../../assets/weather_icons/01d.png'),
    '01n': require('../../assets/weather_icons/01n.png'),
    '02d': require('../../assets/weather_icons/02d.png'),
    '02n': require('../../assets/weather_icons/02n.png'),
    '03d': require('../../assets/weather_icons/03d.png'),
    '03n': require('../../assets/weather_icons/03n.png'),
    '04d': require('../../assets/weather_icons/04d.png'),
    '04n': require('../../assets/weather_icons/04d.png'),
    '09d': require('../../assets/weather_icons/09d.png'),
    '09n': require('../../assets/weather_icons/09n.png'),
    '10d': require('../../assets/weather_icons/10d.png'),
    '10n': require('../../assets/weather_icons/10d.png'),
    '11d': require('../../assets/weather_icons/11d.png'),
    '11n': require('../../assets/weather_icons/11d.png'),
    '13n': require('../../assets/weather_icons/13n.png'),
    '13d': require('../../assets/weather_icons/13d.png'),
    '50d': require('../../assets/weather_icons/50d.png'),
    '50n': require('../../assets/weather_icons/50n.png'),
  };

  const iconSource = iconMapping[ICON] 
  const name_country = `${data.city.name}, ${data.city.country} `;
  console.log(ICON);

  const renderItem = ({ item, index }) => {
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
  };

  // Split the header text into words
  const headerWords = data.list[0].weather[0].description.split(' ');

  return (
    <View style={styles.container}>
      <View>
        {headerWords.map((word, index) => (
          <Text key={index} style={styles.headerText}>{word}</Text>
        ))}
      </View>
      <Image style={styles.image} source={iconSource} />

      <View style={styles.details_container}>
        <Text style={styles.normal}>{name_country}</Text>
    
        <Text style={styles.main_temp} onPress={handleTemperatureClick}>{renderTemperature(weatherItems[0].average.main.temp)}</Text>
        <Text style={styles.normal}>Feels like {renderTemperature(weatherItems[0].average.main.feels_like)}</Text>
      </View>
      <FlatList
        data={weatherList}
        renderItem={renderItem}
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
    </View>
  );
};

export default WeatherForecast;
