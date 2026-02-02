export default function Topbar({ onToggle }) {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          ☰
        </button>
        <h1 className="text-xl font-bold text-blue-600">Transport Admin</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 hidden sm:block">Rajeev</span>
        <img src="https://i.pravatar.cc/40" className="rounded-full" />
      </div>
    </header>
  );
}
