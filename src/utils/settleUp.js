export const settleExpenses = (people, expenses) => {
  if (people.length === 0 || expenses.length === 0) return [];

  const balances = {};
  people.forEach((p) => (balances[p.id] = 0));

  expenses.forEach((exp) => {
    const share = exp.amount / exp.splitAmong.length;
    exp.splitAmong.forEach((id) => {
      balances[id] -= share;
    });
    balances[exp.paidBy] += exp.amount;
  });

  const creditors = [];
  const debtors = [];

  Object.keys(balances).forEach((id) => {
    const amount = balances[id];
    if (amount > 0) creditors.push({ id, amount });
    else if (amount < 0) debtors.push({ id, amount: -amount });
  });

  const settlements = [];
  let i = 0,
    j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const minAmount = Math.min(debtor.amount, creditor.amount);

    settlements.push({
      from: people.find((p) => p.id === debtor.id).name,
      to: people.find((p) => p.id === creditor.id).name,
      amount: minAmount,
    });

    debtor.amount -= minAmount;
    creditor.amount -= minAmount;

    if (debtor.amount === 0) i++;
    if (creditor.amount === 0) j++;
  }

  return settlements;
};
