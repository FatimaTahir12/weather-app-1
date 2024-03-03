import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper"; // Assuming you are using react-native-paper for Card components
import TempUnitSelector from "./TempUnitSelector";

const CityDetailsCard = ({ data }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{data.name}</Title>
       
        <Paragraph>{data.country}</Paragraph>
      </Card.Content>
      <Card.Content>
        <TempUnitSelector />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});

export default CityDetailsCard;
