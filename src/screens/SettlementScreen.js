import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { ExpenseContext } from '../context/ExpenseContext';
import { settleExpenses } from '../utils/settleUp';
import { Card, Title, Paragraph } from 'react-native-paper';

const SettlementScreen = () => {
  const { people, expenses } = useContext(ExpenseContext);
  const settlements = settleExpenses(people, expenses);

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Settlements</Title>

      {settlements.length === 0 ? (
        <Text style={styles.noSettlements}>No settlements needed</Text>
      ) : (
        settlements.map((s, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Paragraph>
                {s.from} pays {s.to}: ${s.amount.toFixed(2)}
              </Paragraph>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    textAlign: 'center',
  },
  noSettlements: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
  card: {
    marginVertical: 8,
  },
});

export default SettlementScreen;
