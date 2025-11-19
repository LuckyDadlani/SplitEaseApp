import React, { createContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { LightTheme, DarkTheme } from '../styles/theme';

// Critical Fix: Provide a default value to createContext
export const ExpenseContext = createContext({
  people: [],
  expenses: [],
  theme: LightTheme, // Default fallback
  isDarkTheme: false,
  toggleTheme: () => {},
  addPerson: () => {},
  updatePerson: () => {},
  deletePerson: () => {},
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
  settledDues: {},
  markSettlementAsDone: () => {},
  markSettlementAsUndone: () => {},
});

const ExpenseProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [settledDues, setSettledDues] = useState({});

  // Ensure theme is never undefined
  const theme = isDarkTheme ? DarkTheme : LightTheme;

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [storedPeople, storedExpenses, storedTheme, storedSettledDues] = await AsyncStorage.multiGet([
          'people',
          'expenses',
          'isDarkTheme',
          'settledDues',
        ]);

        if (storedPeople[1]) setPeople(JSON.parse(storedPeople[1]));
        if (storedExpenses[1]) setExpenses(JSON.parse(storedExpenses[1]));
        if (storedTheme[1]) setIsDarkTheme(storedTheme[1] === 'true');
        if (storedSettledDues[1]) setSettledDues(JSON.parse(storedSettledDues[1]));

      } catch (error) {
        console.log('Error loading data', error);
      }
    };
    loadData();
  }, []);

  // Save data
  useEffect(() => { AsyncStorage.setItem('people', JSON.stringify(people)); }, [people]);
  useEffect(() => { AsyncStorage.setItem('expenses', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { AsyncStorage.setItem('isDarkTheme', String(isDarkTheme)); }, [isDarkTheme]);
  useEffect(() => { AsyncStorage.setItem('settledDues', JSON.stringify(settledDues)); }, [settledDues]);

  // CRUD Operations
  const addPerson = (name) => {
    setPeople((prev) => [...prev, { id: uuidv4(), name }]);
  };

  const updatePerson = (id, newName) => {
    setPeople((prev) => prev.map((p) => (p.id === id ? { ...p, name: newName } : p)));
  };
  
  const deletePerson = (id) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
    setExpenses((prev) => prev.filter((exp) => exp.paidBy !== id && !exp.splitAmong.includes(id)));
  };

  const addExpense = (title, amount, paidBy, splitAmong) => {
    setExpenses((prev) => [...prev, { id: uuidv4(), title, amount: parseFloat(amount), paidBy, splitAmong }]);
  };
  
  const updateExpense = (id, title, amount, paidBy, splitAmong) => {
    setExpenses((prev) => prev.map((exp) => 
        (exp.id === id ? { id, title, amount: parseFloat(amount), paidBy, splitAmong } : exp)
    ));
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };
  
  const markSettlementAsDone = (key) => setSettledDues((prev) => ({ ...prev, [key]: true }));
  const markSettlementAsUndone = (key) => {
    setSettledDues((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  const contextValue = useMemo(() => ({
    people, expenses, theme, isDarkTheme, toggleTheme, settledDues,
    addPerson, updatePerson, deletePerson,
    addExpense, updateExpense, deleteExpense,
    markSettlementAsDone, markSettlementAsUndone
  }), [people, expenses, theme, isDarkTheme, settledDues]);

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;