import { useState, useEffect } from "react";
import Header from "./components/Header";
import StatCards from "./components/StatCards";
import BudgetBar from "./components/BudgetBar";
import Tabs from "./components/Tabs";
import SubList from "./components/SubList";
import Categories from "./components/Categories";
import History from "./components/History";
import AddModal from "./components/AddModal";
import "./App.css";

const defaultSubs = [
  { id: 1, name: "Netflix", cat: "Streaming", price: 649, cycle: "monthly", next: "2026-05-10", emoji: "📺" },
  { id: 2, name: "Spotify", cat: "Music", price: 119, cycle: "monthly", next: "2026-05-15", emoji: "🎵" },
  { id: 3, name: "YouTube Premium", cat: "Streaming", price: 189, cycle: "monthly", next: "2026-05-08", emoji: "📺" },
  { id: 4, name: "Microsoft 365", cat: "Productivity", price: 420, cycle: "monthly", next: "2026-05-20", emoji: "💼" },
  { id: 5, name: "iCloud 50GB", cat: "Cloud", price: 75, cycle: "monthly", next: "2026-05-12", emoji: "☁️" },
];

const defaultHistory = [
  { id: 1, sub: "Netflix", cat: "Streaming", price: 649, date: "2026-04-10" },
  { id: 2, sub: "Spotify", cat: "Music", price: 119, date: "2026-04-15" },
  { id: 3, sub: "YouTube Premium", cat: "Streaming", price: 189, date: "2026-04-08" },
];

export default function App() {
  const [subs, setSubs] = useState(() => {
    const saved = localStorage.getItem("subs");
    return saved ? JSON.parse(saved) : defaultSubs;
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : defaultHistory;
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("budget");
    return saved ? parseInt(saved) : 2000;
  });

  const [tab, setTab] = useState("subscriptions");
  const [filter, setFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [nextId, setNextId] = useState(100);

  useEffect(() => {
    localStorage.setItem("subs", JSON.stringify(subs));
  }, [subs]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("budget", budget.toString());
  }, [budget]);

  const addSub = (sub) => {
    const newSub = { ...sub, id: nextId };
    setSubs((prev) => [...prev, newSub]);
    setNextId((n) => n + 1);
    setShowAdd(false);
  };

  const deleteSub = (id) => {
    const sub = subs.find((s) => s.id === id);
    if (sub) {
      setHistory((prev) => [
        ...prev,
        {
          id: Date.now(),
          sub: sub.name,
          cat: sub.cat,
          price: sub.price,
          date: new Date().toISOString().slice(0, 10),
        },
      ]);
    }
    setSubs((prev) => prev.filter((s) => s.id !== id));
  };

  const total = subs.reduce((a, s) => a + s.price, 0);

  return (
    <div className="app">
      <Header onAdd={() => setShowAdd(true)} />
      <main className="main">
        <StatCards subs={subs} total={total} budget={budget} />
        <BudgetBar total={total} budget={budget} setBudget={setBudget} />
        <Tabs tab={tab} setTab={(t) => { setTab(t); setFilter("All"); }} />

        {tab === "subscriptions" && (
          <SubList
            subs={subs}
            filter={filter}
            setFilter={setFilter}
            onDelete={deleteSub}
          />
        )}
        {tab === "categories" && <Categories subs={subs} />}
        {tab === "history" && <History history={history} />}
      </main>

      {showAdd && (
        <AddModal onAdd={addSub} onClose={() => setShowAdd(false)} />
      )}
    </div>
  );
}
