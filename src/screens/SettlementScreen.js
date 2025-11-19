import React, { useContext, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Text as RNText } from 'react-native';
import { ExpenseContext } from '../context/ExpenseContext';
import { settleExpenses } from '../utils/settleUp';
import { Card, Title, Paragraph, Checkbox, Text } from 'react-native-paper';

const SettlementScreen = () => {
  const { people, expenses, settledDues, markSettlementAsDone, markSettlementAsUndone, theme } = useContext(ExpenseContext);

  const allSettlements = useMemo(() => {
    return settleExpenses(people, expenses).map((s) => ({
      ...s,
      key: `${s.from}-${s.to}-${s.amount.toFixed(2)}`,
    }));
  }, [people, expenses]);

  const handleToggle = (key) => {
    if (settledDues[key]) markSettlementAsUndone(key);
    else markSettlementAsDone(key);
  };
  
  const pending = allSettlements.filter(s => !settledDues[s.key]);
  const completed = allSettlements.filter(s => settledDues[s.key]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.padding}>
        <Title style={[styles.title, { color: theme.colors.text }]}>Pending</Title>
        {pending.length === 0 ? (
          <RNText style={[styles.noSettlements, { color: theme.colors.text }]}>All settled! 🎉</RNText>
        ) : (
          pending.map((s) => (
            <Card key={s.key} style={[styles.card, { backgroundColor: theme.colors.surface }]}>
              <View style={styles.cardContent}>
                <Paragraph style={{ color: theme.colors.text }}>
                  {s.from} → {s.to}: <Text style={{ fontWeight: 'bold', color: theme.colors.primary }}>${s.amount.toFixed(2)}</Text>
                </Paragraph>
                <Checkbox status={'unchecked'} onPress={() => handleToggle(s.key)} />
              </View>
            </Card>
          ))
        )}

        {completed.length > 0 && (
          <>
            <Title style={[styles.title, { color: theme.colors.text, marginTop: 32 }]}>Settled</Title>
            {completed.map((s) => (
              <Card key={s.key} style={[styles.card, styles.settledCard, { backgroundColor: theme.colors.surface }]}>
                <View style={styles.cardContent}>
                    <Paragraph style={[styles.settledText, { color: theme.colors.placeholder }]}>
                      {s.from} paid {s.to}: ${s.amount.toFixed(2)}
                    </Paragraph>
                    <Checkbox status={'checked'} onPress={() => handleToggle(s.key)} />
                </View>
              </Card>
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  padding: { padding: 16 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center', fontWeight: 'bold' },
  noSettlements: { textAlign: 'center', marginTop: 20, fontSize: 16 },
  card: { marginVertical: 4, borderRadius: 8 },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
  settledCard: { opacity: 0.6, borderLeftWidth: 4, borderLeftColor: '#4CAF50' },
  settledText: { textDecorationLine: 'line-through' }
});

export default SettlementScreen;