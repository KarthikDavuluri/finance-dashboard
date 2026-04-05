import useStore from '../store/useStore';
import { getInsights, formatCurrency } from '../utils/helpers';

export default function InsightsPanel() {
  const transactions = useStore((s) => s.transactions);
  const insights = getInsights(transactions);

  const expenseDiff = insights.currentMonthExpense - insights.previousMonthExpense;
  const expenseDirection = expenseDiff > 0 ? 'increase' : expenseDiff < 0 ? 'decrease' : 'same';

  const cards = [
    {
      label: 'Highest Spending',
      value: insights.highestCategory
        ? `${insights.highestCategory.name}`
        : 'N/A',
      sub: insights.highestCategory
        ? formatCurrency(insights.highestCategory.amount)
        : '',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-950/40',
    },
    {
      label: 'Monthly Expenses',
      value: `${formatCurrency(insights.currentMonthExpense)}`,
      sub: expenseDirection === 'same'
        ? 'No change from last month'
        : `${formatCurrency(Math.abs(expenseDiff))} ${expenseDirection} vs last month`,
      icon: expenseDirection === 'increase' ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22" />
        </svg>
      ),
      color: expenseDirection === 'increase' ? 'text-rose-500' : 'text-emerald-500',
      bg: expenseDirection === 'increase' ? 'bg-rose-50 dark:bg-rose-950/40' : 'bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      label: 'Total Transactions',
      value: insights.totalTransactions,
      sub: 'Across all months',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
        </svg>
      ),
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Insights
      </h3>
      <div className="space-y-4">
        {cards.map((card) => (
          <div key={card.label} className="flex items-start gap-3">
            <div className={`p-2.5 rounded-xl ${card.bg} ${card.color} shrink-0`}>
              {card.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                {card.label}
              </p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {card.value}
              </p>
              {card.sub && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{card.sub}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
