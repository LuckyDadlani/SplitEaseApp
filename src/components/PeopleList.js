import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Title } from 'react-native-paper';

const PeopleList = ({ people }) => {
  if (people.length === 0) return null;

  return (
    <View style={styles.container}>
      <Title>People</Title>
      {people.map((person) => (
        <Card key={person.id} style={styles.card}>
          <Card.Content>
            <Text>{person.name}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  card: {
    marginVertical: 4,
  },
});

export default PeopleList;
