import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import useStore from '../store/useStore';
import { getMonthlyBalances } from '../utils/helpers';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null;
  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function BalanceChart() {
  const transactions = useStore((s) => s.transactions);
  const darkMode = useStore((s) => s.darkMode);
  const data = getMonthlyBalances(transactions);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Balance Trend
      </h3>
      {data.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-500 text-center py-12">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? '#374151' : '#f1f5f9'}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }}
              axisLine={{ stroke: darkMode ? '#4b5563' : '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 13, paddingTop: 8 }}
            />
            <Line
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#22c55e"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#22c55e' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              name="Expense"
              stroke="#ef4444"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#ef4444' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              name="Balance"
              stroke="#6366f1"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#6366f1' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
