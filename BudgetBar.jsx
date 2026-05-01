import { useState } from "react";
import "./BudgetBar.css";

export default function BudgetBar({ total, budget, setBudget }) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(budget.toString());

  const pct = Math.min(100, Math.round((total / budget) * 100));
  const barColor =
    pct > 90 ? "var(--danger)" : pct > 70 ? "var(--warn)" : "var(--accent)";

  const handleSave = () => {
    const val = parseInt(input);
    if (!isNaN(val) && val > 0) setBudget(val);
    setEditing(false);
  };

  return (
    <div className="budget-card">
      <div className="budget-top">
        <div>
          <p className="budget-label">Monthly Budget</p>
          <p className="budget-pct">{pct}% used</p>
        </div>
        {editing ? (
          <div className="budget-edit-row">
            <span className="rupee-symbol">₹</span>
            <input
              className="budget-input"
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-small" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <div className="budget-amount-row">
            <span className="budget-amount">
              ₹{total.toLocaleString("en-IN")} / ₹{budget.toLocaleString("en-IN")}
            </span>
            <button className="edit-link" onClick={() => { setInput(budget.toString()); setEditing(true); }}>
              Edit budget
            </button>
          </div>
        )}
      </div>

      <div className="bar-track">
        <div
          className="bar-fill"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>

      <div className="budget-summary">
        <span>₹{total.toLocaleString("en-IN")} spent</span>
        <span style={{ color: budget - total < 0 ? "var(--danger)" : "var(--text-muted)" }}>
          {budget - total < 0
            ? `₹${Math.abs(budget - total).toLocaleString("en-IN")} over budget`
            : `₹${(budget - total).toLocaleString("en-IN")} remaining`}
        </span>
      </div>
    </div>
  );
}
