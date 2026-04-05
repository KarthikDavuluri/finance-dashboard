import { useMemo, useState } from 'react';
import useStore from '../store/useStore';
import { formatCurrency, formatDate } from '../utils/helpers';

function SortIcon({ active, direction }) {
  return (
    <svg
      className={`w-4 h-4 inline ml-1 transition-colors ${active ? 'text-indigo-500' : 'text-gray-300 dark:text-gray-600'}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
      {direction === 'asc' ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
      )}
    </svg>
  );
}

export default function TransactionTable() {
  const transactions = useStore((s) => s.transactions);
  const searchQuery = useStore((s) => s.searchQuery);
  const filterType = useStore((s) => s.filterType);
  const role = useStore((s) => s.role);
  const deleteTransaction = useStore((s) => s.deleteTransaction);

  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const editTransaction = useStore((s) => s.editTransaction);

  const filtered = useMemo(() => {
    let result = [...transactions];

    // Filter by search
    if (searchQuery) {
      result = result.filter((t) =>
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== 'all') {
      result = result.filter((t) => t.type === filterType);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else {
        comparison = a.amount - b.amount;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [transactions, searchQuery, filterType, sortBy, sortOrder]);

  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  }

  function startEdit(t) {
    setEditingId(t.id);
    setEditForm({ date: t.date, amount: t.amount, category: t.category, type: t.type });
  }

  function saveEdit() {
    editTransaction(editingId, { ...editForm, amount: Number(editForm.amount) });
    setEditingId(null);
    setEditForm({});
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

  return (
    <div className="overflow-x-auto">
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
          <p className="text-gray-400 dark:text-gray-500 font-medium">No transactions found</p>
          <p className="text-sm text-gray-300 dark:text-gray-600 mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              <th
                className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 select-none"
                onClick={() => handleSort('date')}
              >
                Date <SortIcon active={sortBy === 'date'} direction={sortOrder} />
              </th>
              <th
                className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 select-none"
                onClick={() => handleSort('amount')}
              >
                Amount <SortIcon active={sortBy === 'amount'} direction={sortOrder} />
              </th>
              <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                Category
              </th>
              <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                Type
              </th>
              {role === 'admin' && (
                <th className="text-right py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr
                key={t.id}
                className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
              >
                {editingId === t.id ? (
                  <>
                    <td className="py-3 px-4">
                      <input type="date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        className="px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm w-full" />
                    </td>
                    <td className="py-3 px-4">
                      <input type="number" value={editForm.amount} onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                        className="px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm w-24" />
                    </td>
                    <td className="py-3 px-4">
                      <input type="text" value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm w-full" />
                    </td>
                    <td className="py-3 px-4">
                      <select value={editForm.type} onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                        className="px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button onClick={saveEdit} className="text-emerald-500 hover:text-emerald-600 font-medium">Save</button>
                      <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600 font-medium">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-200">
                      {formatDate(t.date)}
                    </td>
                    <td className={`py-3 px-4 font-semibold ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-200">
                      <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-medium">
                        {t.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                        t.type === 'income'
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                          : 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
                      }`}>
                        {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                      </span>
                    </td>
                    {role === 'admin' && (
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => startEdit(t)}
                          className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTransaction(t.id)}
                          className="text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
