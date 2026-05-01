import "./StatCards.css";

export default function StatCards({ subs, total, budget }) {
  const left = budget - total;
  const annual = total * 12;
  const leftClass = left < 0 ? "danger" : left < 300 ? "warn" : "safe";

  return (
    <div className="stat-grid">
      <div className="stat-card">
        <p className="stat-label">Monthly Total</p>
        <p className="stat-val">₹{total.toLocaleString("en-IN")}</p>
        <p className="stat-sub">≈ ₹{annual.toLocaleString("en-IN")}/yr</p>
      </div>

      <div className="stat-card">
        <p className="stat-label">Active Plans</p>
        <p className="stat-val">{subs.length}</p>
        <p className="stat-sub">
          {subs.length === 0 ? "No subscriptions" : "subscriptions"}
        </p>
      </div>

      <div className="stat-card">
        <p className="stat-label">Budget Left</p>
        <p className={`stat-val ${leftClass}`}>
          {left < 0 ? "-" : ""}₹{Math.abs(left).toLocaleString("en-IN")}
        </p>
        <p className={`stat-sub ${leftClass}`}>
          {left < 0 ? "Over budget!" : left < 300 ? "Running low" : "Looking good"}
        </p>
      </div>
    </div>
  );
}
