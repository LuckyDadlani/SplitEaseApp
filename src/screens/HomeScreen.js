import React, { useState, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { ExpenseContext } from '../context/ExpenseContext';
import AddPersonModal from '../components/AddPersonModal';
import AddExpenseModal from '../components/AddExpenseModal';
import PeopleList from '../components/PeopleList';
import ExpenseList from '../components/ExpenseList';
import SummaryCard from '../components/SummaryCard';

const HomeScreen = ({ navigation }) => {
  const { people, expenses } = useContext(ExpenseContext);

  const [personModalVisible, setPersonModalVisible] = useState(false);
  const [expenseModalVisible, setExpenseModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>SplitEase</Title>

      <Button
        mode="contained"
        onPress={() => setPersonModalVisible(true)}
        style={styles.button}
      >
        Add Person
      </Button>
      <AddPersonModal
        visible={personModalVisible}
        onDismiss={() => setPersonModalVisible(false)}
      />

      {people.length > 0 && (
        <>
          <Button
            mode="contained"
            onPress={() => setExpenseModalVisible(true)}
            style={styles.button}
          >
            Add Expense
          </Button>
          <AddExpenseModal
            visible={expenseModalVisible}
            onDismiss={() => setExpenseModalVisible(false)}
          />

          <PeopleList people={people} />        
        <ExpenseList expenses={expenses} people={people} />
          <SummaryCard people={people} expenses={expenses} />

          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Settle')}
            style={styles.button}
          >
            View Settlements
          </Button>
        </>
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
  button: {
    marginVertical: 8,
  },
});

export default HomeScreen;
