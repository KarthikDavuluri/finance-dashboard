import { formatCurrency } from '../utils/helpers';
import useStore from '../store/useStore';

const icons = {
  balance: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  income: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  ),
  expense: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
    </svg>
  ),
};

export default function SummaryCards() {
  const transactions = useStore((s) => s.transactions);

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  const cards = [
    {
      title: 'Total Balance',
      value: totalBalance,
      icon: icons.balance,
      color: 'from-indigo-500 to-purple-600',
      bgLight: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      darkBg: 'dark:bg-indigo-950/40',
      darkText: 'dark:text-indigo-400',
    },
    {
      title: 'Total Income',
      value: totalIncome,
      icon: icons.income,
      color: 'from-emerald-500 to-green-600',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      darkBg: 'dark:bg-emerald-950/40',
      darkText: 'dark:text-emerald-400',
    },
    {
      title: 'Total Expenses',
      value: totalExpense,
      icon: icons.expense,
      color: 'from-rose-500 to-red-600',
      bgLight: 'bg-rose-50',
      textColor: 'text-rose-600',
      darkBg: 'dark:bg-rose-950/40',
      darkText: 'dark:text-rose-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-5 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {card.title}
            </span>
            <div className={`p-2 rounded-xl ${card.bgLight} ${card.darkBg} ${card.textColor} ${card.darkText}`}>
              {card.icon}
            </div>
          </div>
          <p className={`text-2xl lg:text-3xl font-bold ${card.textColor} ${card.darkText}`}>
            {formatCurrency(card.value)}
          </p>
          {/* Decorative gradient bar */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`} />
        </div>
      ))}
    </div>
  );
}
