// React imports
import React, { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
// Third-party imports
import { useDispatch } from "react-redux";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import search from '../../assets/search.png'

// Local imports
import { setCity } from "../weatherSlice";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#fff',  // Text color
    borderBottomWidth: 1,  // Border bottom thickness
    borderBottomColor: '#fff',  // Border bottom color

    paddingHorizontal: 3,
    fontSize: 18,
 
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    marginBottom: 10,
    tintColor: '#fff',  // Icon color
  },
});

const CitySetter = () => {
  const dispatch = useDispatch();
  const [inputTerm, setInputTerm] = useState("");

  const handleChangeInputTerm = (text) => {
    setInputTerm(text);
    console.log(text);
  };

  const handleResult = () => {
    dispatch(setCity({ city: inputTerm }));
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter city name..."
              value={inputTerm}
              onChangeText={handleChangeInputTerm}
            />
            <TouchableOpacity onPress={() => handleResult()} style={{ position: 'absolute', right: 10 }}>
              <Image source={search} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CitySetter;
