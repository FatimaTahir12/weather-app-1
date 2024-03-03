import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper"; // Assuming you are using react-native-paper for RadioButton
import { useSelector, useDispatch } from "react-redux";
import { setTempUnit } from "../weatherSlice";

const tempUnits = ["celsius", "fahrenheit"];

const TempUnitSelector = () => {
  const tempUnit = useSelector((state) => state.weather.tempUnit);

  const dispatch = useDispatch();

  const handleChange = (selectedTempUnit) => {
    dispatch(setTempUnit({ tempUnit: selectedTempUnit }));
  };

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Temperature Unit</Text>
      {tempUnits.map((_tempUnit) => (
        <View key={_tempUnit} style={styles.radioButtonContainer}>
          <RadioButton
            value={_tempUnit}
            status={tempUnit === _tempUnit ? "checked" : "unchecked"}
            onPress={() => handleChange(_tempUnit)}
            color="#007bff" // Adjust the color based on your design
          />
          <Text style={styles.radioLabel}>{toTitleCase(_tempUnit)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default TempUnitSelector;
