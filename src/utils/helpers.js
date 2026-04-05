export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getMonthlyBalances(transactions) {
  const monthlyMap = {};

  transactions.forEach((t) => {
    const month = t.date.slice(0, 7); // YYYY-MM
    if (!monthlyMap[month]) {
      monthlyMap[month] = { income: 0, expense: 0 };
    }
    if (t.type === 'income') {
      monthlyMap[month].income += t.amount;
    } else {
      monthlyMap[month].expense += t.amount;
    }
  });

  return Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      income: data.income,
      expense: data.expense,
      balance: data.income - data.expense,
    }));
}

export function getCategoryBreakdown(transactions) {
  const map = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });

  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

export function getInsights(transactions) {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const categoryTotals = {};
  expenses.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const highestCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  // Monthly comparison (latest two months)
  const monthlyMap = {};
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7);
    if (!monthlyMap[month]) monthlyMap[month] = { income: 0, expense: 0 };
    if (t.type === 'income') monthlyMap[month].income += t.amount;
    else monthlyMap[month].expense += t.amount;
  });

  const months = Object.keys(monthlyMap).sort();
  const currentMonth = months[months.length - 1];
  const previousMonth = months[months.length - 2];

  return {
    highestCategory: highestCategory ? { name: highestCategory[0], amount: highestCategory[1] } : null,
    currentMonthExpense: monthlyMap[currentMonth]?.expense || 0,
    previousMonthExpense: monthlyMap[previousMonth]?.expense || 0,
    currentMonthIncome: monthlyMap[currentMonth]?.income || 0,
    previousMonthIncome: monthlyMap[previousMonth]?.income || 0,
    totalTransactions: transactions.length,
  };
}

export function exportToCSV(transactions) {
  const headers = ['Date', 'Amount', 'Category', 'Type'];
  const rows = transactions.map((t) =>
    [t.date, t.amount, t.category, t.type].join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transactions.csv';
  a.click();
  URL.revokeObjectURL(url);
}
