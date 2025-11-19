import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, Button, TextInput } from 'react-native-paper';
import { ExpenseContext } from '../context/ExpenseContext';

const AddPersonModal = ({ visible, onDismiss }) => {
  const { addPerson, theme } = useContext(ExpenseContext);
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (name.trim()) {
      addPerson(name.trim());
      setName('');
      onDismiss();
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
        <TextInput label="Name" value={name} onChangeText={setName} style={styles.input} mode="outlined" />
        <Button mode="contained" onPress={handleAdd}>Add Person</Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({ container: { padding: 20, margin: 20, borderRadius: 8 }, input: { marginBottom: 12 } });

export default AddPersonModal;