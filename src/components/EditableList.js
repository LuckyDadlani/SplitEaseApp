import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton, TextInput } from 'react-native-paper';
import { ExpenseContext } from '../context/ExpenseContext';

const EditableListItem = ({ item, textKey, onUpdate, onDelete }) => {
  const { theme } = useContext(ExpenseContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(item[textKey]);

  const handleUpdate = () => {
    if (newValue.trim() !== '' && newValue !== item[textKey]) {
      onUpdate(item.id, newValue.trim());
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.editContainer}>
          <TextInput
            value={newValue}
            onChangeText={setNewValue}
            autoFocus
            style={{ flex: 1, marginRight: 8, backgroundColor: theme.colors.background }}
            mode="outlined"
            dense
          />
          <IconButton icon="content-save" onPress={handleUpdate} />
          <IconButton icon="close" onPress={() => setIsEditing(false)} />
        </View>
      </Card>
    );
  }

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.content}>
        <Text style={{ flex: 1, color: theme.colors.text, fontSize: 16 }}>{item[textKey]}</Text>
        <IconButton icon="pencil" onPress={() => setIsEditing(true)} size={20} />
        <IconButton icon="delete" onPress={() => onDelete(item.id)} iconColor={theme.colors.error} size={20} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginVertical: 4 },
  content: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
  editContainer: { flexDirection: 'row', alignItems: 'center', padding: 8 },
});

export default EditableListItem;