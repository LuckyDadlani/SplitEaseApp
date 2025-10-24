import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';

const ExpenseList = ({ expenses, people }) => {
  if (expenses.length === 0) return null;

  return (
    <View style={styles.container}>
      <Title>Expenses</Title>
      {expenses.map((expense) => (
        <Card key={expense.id} style={styles.card}>
          <Card.Content>
            <Paragraph style={styles.title}>{expense.title}</Paragraph>
            <Paragraph>Amount: ${expense.amount.toFixed(2)}</Paragraph>
            <Paragraph>
              Paid by: {people.find((p) => p.id === expense.paidBy)?.name || 'Unknown'}
            </Paragraph>
            <Paragraph>
              Split among: {expense.splitAmong
                .map((id) => people.find((p) => p.id === id)?.name || 'Unknown')
                .join(', ')}
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
  title: {
    fontWeight: 'bold',
  },
});

export default ExpenseList;
