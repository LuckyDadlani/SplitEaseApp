import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Modal, Portal, Button, TextInput, Checkbox, Text } from 'react-native-paper';
import { ExpenseContext } from '../context/ExpenseContext';

const AddExpenseModal = ({ visible, onDismiss }) => {
  const { people, addExpense } = useContext(ExpenseContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(null);
  const [splitAmong, setSplitAmong] = useState([]);

  const toggleSplit = (id) => {
    setSplitAmong((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    if (!title || !amount || !paidBy || splitAmong.length === 0) return;
    addExpense(title, amount, paidBy, splitAmong);
    setTitle('');
    setAmount('');
    setPaidBy(null);
    setSplitAmong([]);
    onDismiss();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.container}>
        <ScrollView>
          <TextInput
            label="Expense Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>Paid By:</Text>
          {people.map((person) => (
            <Button
              key={person.id}
              mode={paidBy === person.id ? 'contained' : 'outlined'}
              onPress={() => setPaidBy(person.id)}
              style={styles.personButton}
            >
              {person.name}
            </Button>
          ))}

          <Text style={styles.label}>Split Among:</Text>
          {people.map((person) => (
            <Checkbox.Item
              key={person.id}
              label={person.name}
              status={splitAmong.includes(person.id) ? 'checked' : 'unchecked'}
              onPress={() => toggleSplit(person.id)}
            />
          ))}

          <Button mode="contained" onPress={handleAdd}>
            Add Expense
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    maxHeight: '80%',
  },
  input: {
    marginBottom: 12,
  },
  label: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  personButton: {
    marginVertical: 4,
  },
});

export default AddExpenseModal;
