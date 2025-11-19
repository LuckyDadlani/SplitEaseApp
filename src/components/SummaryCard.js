import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { ExpenseContext } from '../context/ExpenseContext';

const SummaryCard = ({ people, expenses }) => {
  const { theme } = useContext(ExpenseContext);
  if (people.length === 0 || expenses.length === 0) return null;

  const balances = {};
  people.forEach((p) => (balances[p.id] = 0));

  expenses.forEach((exp) => {
    const share = exp.amount / exp.splitAmong.length;
    exp.splitAmong.forEach((id) => { balances[id] -= share; });
    balances[exp.paidBy] += exp.amount;
  });

  return (
    <View style={styles.container}>
      <Title style={{ color: theme.colors.text }}>Summary</Title>
      {people.map((person) => (
        <Card key={person.id} style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Paragraph style={{ color: theme.colors.text }}>
              {person.name}: 
              <Paragraph style={{ fontWeight: 'bold', color: balances[person.id] >= 0 ? theme.colors.primary : theme.colors.error }}>
                 {balances[person.id] >= 0 ? ' gets back ' : ' owes '}${Math.abs(balances[person.id]).toFixed(2)}
              </Paragraph>
            </Paragraph>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({ container: { marginVertical: 16 }, card: { marginVertical: 4, borderRadius: 8 } });

export default SummaryCard;