import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/mockData';

const useStore = create(
  persist(
    (set) => ({
      // Data
      transactions: mockTransactions,

      // Filters
      searchQuery: '',
      filterType: 'all', // 'all' | 'income' | 'expense'
      sortBy: 'date',     // 'date' | 'amount'
      sortOrder: 'desc',  // 'asc' | 'desc'

      // Role (null = not logged in)
      role: null, // null | 'viewer' | 'admin'

      // Theme
      darkMode: false,

      // Actions — Transactions
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            { ...transaction, id: Date.now() },
            ...state.transactions,
          ],
        })),

      editTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      // Actions — Filters
      setSearchQuery: (query) => set({ searchQuery: query }),
      setFilterType: (type) => set({ filterType: type }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (order) => set({ sortOrder: order }),

      // Actions — Role
      setRole: (role) => set({ role }),
      logout: () => set({ role: null }),

      // Actions — Theme
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'finance-dashboard-storage',
      partialize: (state) => ({
        transactions: state.transactions,
        darkMode: state.darkMode,
        role: state.role,
      }),
    }
  )
);

export default useStore;
