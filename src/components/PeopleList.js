import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { ExpenseContext } from '../context/ExpenseContext';
import EditableListItem from './EditableList';

const PeopleList = ({ people }) => {
  const { updatePerson, deletePerson, theme } = useContext(ExpenseContext);
  
  if (people.length === 0) return null;

  return (
    <View style={styles.container}>
      <Title style={{ color: theme.colors.text }}>People</Title>
      {people.map((person) => (
        <EditableListItem 
          key={person.id} 
          item={person} 
          textKey="name"
          onUpdate={updatePerson}
          onDelete={deletePerson}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
});

export default PeopleList;