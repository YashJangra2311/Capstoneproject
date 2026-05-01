import "./Tabs.css";

const TABS = [
  { id: "subscriptions", label: "Subscriptions", icon: "💳" },
  { id: "categories", label: "Categories", icon: "📊" },
  { id: "history", label: "History", icon: "📋" },
];

export default function Tabs({ tab, setTab }) {
  return (
    <div className="tabs-bar">
      {TABS.map((t) => (
        <button
          key={t.id}
          className={`tab-btn ${tab === t.id ? "active" : ""}`}
          onClick={() => setTab(t.id)}
        >
          <span className="tab-icon">{t.icon}</span>
          <span className="tab-label">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
