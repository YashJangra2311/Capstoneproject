import { CAT_COLORS, CAT_ICONS, ALL_CATS } from "../constants";
import "./Categories.css";

export default function Categories({ subs }) {
  const byCat = {};
  ALL_CATS.forEach((c) => (byCat[c] = { total: 0, count: 0 }));
  subs.forEach((s) => {
    if (!byCat[s.cat]) byCat[s.cat] = { total: 0, count: 0 };
    byCat[s.cat].total += s.price;
    byCat[s.cat].count += 1;
  });

  const activeCats = ALL_CATS.filter((c) => byCat[c].count > 0);
  const grandTotal = subs.reduce((a, s) => a + s.price, 0);
  const max = Math.max(...activeCats.map((c) => byCat[c].total), 1);

  if (activeCats.length === 0) {
    return (
      <div className="cat-empty">
        <p className="empty-icon">📊</p>
        <p className="empty-title">No categories yet</p>
        <p className="empty-sub">Add subscriptions to see category breakdown</p>
      </div>
    );
  }

  return (
    <div>
      <div className="cat-summary">
        <span>Total across {activeCats.length} categories</span>
        <strong>₹{grandTotal.toLocaleString("en-IN")}/mo</strong>
      </div>
      <div className="cat-list">
        {activeCats
          .sort((a, b) => byCat[b].total - byCat[a].total)
          .map((cat) => {
            const { total, count } = byCat[cat];
            const pct = Math.round((total / max) * 100);
            const share = grandTotal > 0 ? Math.round((total / grandTotal) * 100) : 0;

            return (
              <div className="cat-card" key={cat}>
                <div className="cat-header">
                  <div className="cat-icon-wrap" style={{ background: CAT_COLORS[cat] }}>
                    {CAT_ICONS[cat]}
                  </div>
                  <div className="cat-info">
                    <p className="cat-name">{cat}</p>
                    <p className="cat-count">
                      {count} subscription{count !== 1 ? "s" : ""} · {share}% of budget
                    </p>
                  </div>
                  <p className="cat-total">₹{total.toLocaleString("en-IN")}/mo</p>
                </div>
                <div className="cat-bar-track">
                  <div
                    className="cat-bar-fill"
                    style={{
                      width: `${pct}%`,
                      background: CAT_COLORS[cat].replace("#E", "#9").replace("#F", "#D"),
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
