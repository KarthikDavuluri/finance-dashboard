import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import useStore from '../store/useStore';
import { getCategoryBreakdown, formatCurrency } from '../utils/helpers';
import { CHART_COLORS } from '../data/mockData';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{name}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{formatCurrency(value)}</p>
    </div>
  );
}

export default function SpendingPieChart() {
  const transactions = useStore((s) => s.transactions);
  const data = getCategoryBreakdown(transactions);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Spending by Category
      </h3>
      {data.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-500 text-center py-12">No expenses yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              wrapperStyle={{ fontSize: 13 }}
              formatter={(value) => (
                <span className="text-gray-600 dark:text-gray-300">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
