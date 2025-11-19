import React, { useState, useContext } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Title, IconButton } from 'react-native-paper';
import { ExpenseContext } from '../context/ExpenseContext';
import AddPersonModal from '../components/AddPersonModal';
import AddExpenseModal from '../components/AddExpenseModal';
import PeopleList from '../components/PeopleList';
import ExpenseList from '../components/ExpenseList';
import SummaryCard from '../components/SummaryCard';

const HomeScreen = () => {
  const { people, expenses, toggleTheme, theme } = useContext(ExpenseContext);
  const [personModalVisible, setPersonModalVisible] = useState(false);
  const [expenseModalVisible, setExpenseModalVisible] = useState(false);

  const HeaderControls = () => (
    <View style={styles.headerContainer}>
      <Title style={[styles.title, { color: theme.colors.text }]}>SplitEase</Title>
      <TouchableOpacity onPress={toggleTheme}>
        <IconButton 
          icon={theme.isDark ? 'white-balance-sunny' : 'weather-night'} 
          iconColor={theme.colors.text} 
          size={24} 
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.contentContainer}>
        <HeaderControls />
        <Button icon="account-plus" mode="contained" onPress={() => setPersonModalVisible(true)} style={styles.button}>
          Add Person
        </Button>
        <AddPersonModal visible={personModalVisible} onDismiss={() => setPersonModalVisible(false)} />

        {people.length > 0 && (
          <>
            <Button icon="cash-plus" mode="contained" onPress={() => setExpenseModalVisible(true)} style={styles.button}>
              Add Expense
            </Button>
            <AddExpenseModal visible={expenseModalVisible} onDismiss={() => setExpenseModalVisible(false)} />

            <PeopleList people={people} />        
            <ExpenseList expenses={expenses} people={people} />
            <SummaryCard people={people} expenses={expenses} />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: 16 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 28, fontWeight: 'bold' },
  button: { marginVertical: 8, borderRadius: 8 },
});

export default HomeScreen;