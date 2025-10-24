import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Button, TextInput } from 'react-native-paper';
import { ExpenseContext } from '../context/ExpenseContext';

const AddPersonModal = ({ visible, onDismiss }) => {
  const { addPerson } = useContext(ExpenseContext);
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (name.trim() !== '') {
      addPerson(name.trim());
      setName('');
      onDismiss();
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.container}>
        <TextInput
          label="Person Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleAdd}>
          Add
        </Button>
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
  },
  input: {
    marginBottom: 12,
  },
});

export default AddPersonModal;
