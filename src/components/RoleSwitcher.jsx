import useStore from '../store/useStore';

export default function RoleSwitcher() {
  const role = useStore((s) => s.role);
  const setRole = useStore((s) => s.setRole);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 hidden sm:inline">Role:</span>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer transition-colors"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}
