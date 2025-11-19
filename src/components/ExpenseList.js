import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Paragraph, Title, IconButton } from 'react-native-paper';
import { ExpenseContext } from '../context/ExpenseContext';
import EditExpenseModal from './EditExpenseModal';

const ExpenseList = ({ expenses, people }) => {
  const { deleteExpense, theme } = useContext(ExpenseContext);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setEditModalVisible(true);
  };

  if (expenses.length === 0) return null;

  return (
    <View style={styles.container}>
      <Title style={{ color: theme.colors.text }}>Expenses</Title>
      {expenses.map((expense) => (
        <Card key={expense.id} style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <View style={styles.header}>
              <Paragraph style={[styles.title, { color: theme.colors.text }]}>{expense.title}</Paragraph>
              <View style={styles.actions}>
                <IconButton icon="pencil" size={20} onPress={() => handleEdit(expense)} />
                <IconButton icon="delete" size={20} onPress={() => deleteExpense(expense.id)} iconColor={theme.colors.error} />
              </View>
            </View>
            <Paragraph style={{ color: theme.colors.text }}>Amount: ${expense.amount.toFixed(2)}</Paragraph>
            <Paragraph style={{ color: theme.colors.text }}>
              Paid by: {people.find((p) => p.id === expense.paidBy)?.name || 'Unknown'}
            </Paragraph>
          </Card.Content>
        </Card>
      ))}
      <EditExpenseModal 
        visible={editModalVisible} 
        onDismiss={() => setEditModalVisible(false)} 
        expenseToEdit={selectedExpense} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  card: { marginVertical: 6, borderRadius: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontWeight: 'bold', fontSize: 16, flex: 1 },
  actions: { flexDirection: 'row' },
});

export default ExpenseList;