import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

export const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedPeople = await AsyncStorage.getItem('people');
        const storedExpenses = await AsyncStorage.getItem('expenses');
        if (storedPeople) setPeople(JSON.parse(storedPeople));
        if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
      } catch (error) {
        console.log('Error loading data', error);
      }
    };
    loadData();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('people', JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    AsyncStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Add a new person
  const addPerson = (name) => {
    setPeople([...people, { id: uuidv4(), name }]);
  };

  // Add a new expense
  const addExpense = (title, amount, paidBy, splitAmong) => {
    setExpenses([
      ...expenses,
      { id: uuidv4(), title, amount: parseFloat(amount), paidBy, splitAmong },
    ]);
  };

  return (
    <ExpenseContext.Provider
      value={{
        people,
        expenses,
        addPerson,
        addExpense,
        setPeople,
        setExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
