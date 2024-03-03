import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import ArrowForwardIosIcon from "react-native-vector-icons/Ionicons"; // Adjust the import based on your choice of icon library
import ArrowBackIosIcon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { setNextPage, setPreviousPage } from "../weatherSlice";

const CardNavigator = ({ pageIndex, lastPageIndex }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
         
      <IconButton
        icon={() => <ArrowBackIosIcon size={24} />}
        onPress={() => dispatch(setPreviousPage())}
        style={{ opacity: pageIndex > 0 ? 1 : 0 }}
      />
      <IconButton
        icon={() => <ArrowForwardIosIcon size={24} />}
        onPress={() => dispatch(setNextPage())}
        style={{ opacity: pageIndex < lastPageIndex ? 1 : 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default CardNavigator;
