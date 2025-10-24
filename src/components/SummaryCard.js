import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';

const SummaryCard = ({ people, expenses }) => {
  if (people.length === 0 || expenses.length === 0) return null;

  // Calculate net balance for each person
  const balances = {};
  people.forEach((p) => (balances[p.id] = 0));

  expenses.forEach((exp) => {
    const share = exp.amount / exp.splitAmong.length;
    exp.splitAmong.forEach((id) => {
      balances[id] -= share;
    });
    balances[exp.paidBy] += exp.amount;
  });

  return (
    <View style={styles.container}>
      <Title>Summary</Title>
      {people.map((person) => (
        <Card key={person.id} style={styles.card}>
          <Card.Content>
            <Paragraph>
              {person.name}: {balances[person.id] >= 0 ? '+' : '-'}$
              {Math.abs(balances[person.id]).toFixed(2)}
            </Paragraph>
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

export default SummaryCard;
