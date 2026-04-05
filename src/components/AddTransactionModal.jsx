import { useState } from 'react';
import useStore from '../store/useStore';
import { categories } from '../data/mockData';

export default function AddTransactionModal() {
  const role = useStore((s) => s.role);
  const addTransaction = useStore((s) => s.addTransaction);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: 'Food',
    type: 'expense',
  });

  if (role !== 'admin') return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.amount || Number(form.amount) <= 0) return;
    addTransaction({ ...form, amount: Number(form.amount) });
    setForm({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      category: 'Food',
      type: 'expense',
    });
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium text-sm transition-colors shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Transaction
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <form
            onSubmit={handleSubmit}
            className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-100 dark:border-gray-700 space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Add Transaction
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Amount ($)</label>
              <input
                type="number"
                min="1"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="Enter amount"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Type</label>
              <div className="flex gap-3">
                <label className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer text-sm font-medium transition-colors ${
                  form.type === 'income'
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-600'
                    : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                }`}>
                  <input type="radio" value="income" checked={form.type === 'income'}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="sr-only" />
                  Income
                </label>
                <label className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer text-sm font-medium transition-colors ${
                  form.type === 'expense'
                    ? 'border-rose-400 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-600'
                    : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                }`}>
                  <input type="radio" value="expense" checked={form.type === 'expense'}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="sr-only" />
                  Expense
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm transition-colors shadow-sm"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
