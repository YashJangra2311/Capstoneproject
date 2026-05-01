import { CAT_COLORS, CAT_ICONS } from "../constants";
import "./History.css";

export default function History({ history }) {
  const total = history.reduce((a, h) => a + h.price, 0);

  if (history.length === 0) {
    return (
      <div className="hist-empty">
        <p className="empty-icon">📋</p>
        <p className="empty-title">No payment history</p>
        <p className="empty-sub">Removed subscriptions will appear here</p>
      </div>
    );
  }

  const grouped = history
    .slice()
    .reverse()
    .reduce((acc, item) => {
      const month = new Date(item.date).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      });
      if (!acc[month]) acc[month] = [];
      acc[month].push(item);
      return acc;
    }, {});

  return (
    <div>
      <div className="hist-summary">
        <span>Total paid ({history.length} payments)</span>
        <strong>₹{total.toLocaleString("en-IN")}</strong>
      </div>

      {Object.entries(grouped).map(([month, items]) => {
        const monthTotal = items.reduce((a, i) => a + i.price, 0);
        return (
          <div className="hist-group" key={month}>
            <div className="hist-month-header">
              <span>{month}</span>
              <span>₹{monthTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="hist-list">
              {items.map((item) => (
                <div className="hist-row" key={item.id}>
                  <div
                    className="hist-icon"
                    style={{ background: CAT_COLORS[item.cat] || "#f1efe8" }}
                  >
                    {CAT_ICONS[item.cat] || "📦"}
                  </div>
                  <div className="hist-info">
                    <p className="hist-name">{item.sub}</p>
                    <p className="hist-date">{item.date}</p>
                  </div>
                  <div className="hist-right">
                    <span className="hist-cat">{item.cat}</span>
                    <p className="hist-price">₹{item.price.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
