import SummaryCards from '../components/SummaryCards';
import BalanceChart from '../components/BalanceChart';
import SpendingPieChart from '../components/SpendingPieChart';
import TransactionTable from '../components/TransactionTable';
import Filters from '../components/Filters';
import AddTransactionModal from '../components/AddTransactionModal';
import InsightsPanel from '../components/InsightsPanel';
import useStore from '../store/useStore';
import { exportToCSV } from '../utils/helpers';

export default function Dashboard() {
  const transactions = useStore((s) => s.transactions);
  const role = useStore((s) => s.role);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6 lg:space-y-8">
      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BalanceChart />
        </div>
        <div>
          <SpendingPieChart />
        </div>
      </div>

      {/* Insights */}
      <InsightsPanel />

      {/* Transactions Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Transactions
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => exportToCSV(transactions)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Export CSV
            </button>
            {role === 'admin' && <AddTransactionModal />}
          </div>
        </div>
        <Filters />
        <div className="mt-4">
          <TransactionTable />
        </div>
      </div>
    </main>
  );
}
