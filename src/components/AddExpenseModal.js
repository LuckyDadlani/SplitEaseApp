import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Modal, Portal, Button, TextInput, Checkbox, Text, Title } from 'react-native-paper';
import { ExpenseContext } from '../context/ExpenseContext';

const AddExpenseModal = ({ visible, onDismiss }) => {
  const { people, addExpense, theme } = useContext(ExpenseContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(null);
  const [splitAmong, setSplitAmong] = useState([]);

  const toggleSplit = (id) => setSplitAmong((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);

  const handleAdd = () => {
    if (!title || !amount || !paidBy || splitAmong.length === 0) return;
    addExpense(title, amount, paidBy, splitAmong);
    setTitle(''); setAmount(''); setPaidBy(null); setSplitAmong([]);
    onDismiss();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView>
          <Title style={{textAlign: 'center', marginBottom: 10, color: theme.colors.text}}>New Expense</Title>
          <TextInput label="Title" value={title} onChangeText={setTitle} style={styles.input} mode="outlined" />
          <TextInput label="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" style={styles.input} mode="outlined" />
          <Text style={[styles.label, {color: theme.colors.text}]}>Paid By:</Text>
          {people.map((p) => (
            <Button key={p.id} mode={paidBy === p.id ? 'contained' : 'outlined'} onPress={() => setPaidBy(p.id)} style={styles.btn}>{p.name}</Button>
          ))}
          <Text style={[styles.label, {color: theme.colors.text}]}>Split Among:</Text>
          {people.map((p) => (
            <Checkbox.Item key={p.id} label={p.name} status={splitAmong.includes(p.id) ? 'checked' : 'unchecked'} onPress={() => toggleSplit(p.id)} labelStyle={{color: theme.colors.text}} />
          ))}
          <Button mode="contained" onPress={handleAdd} style={styles.btn}>Add</Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({ container: { padding: 20, margin: 20, borderRadius: 8, maxHeight: '80%' }, input: { marginBottom: 12 }, label: { marginTop: 10, fontWeight: 'bold' }, btn: { marginVertical: 4 } });

export default AddExpenseModal;