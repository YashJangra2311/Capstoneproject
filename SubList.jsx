import SubCard from "./SubCard";
import "./SubList.css";

const CATS = ["All", "Streaming", "Music", "Gaming", "Productivity", "News", "Cloud", "Health", "Other"];

export default function SubList({ subs, filter, setFilter, onDelete }) {
  const filtered = filter === "All" ? subs : subs.filter((s) => s.cat === filter);

  return (
    <div>
      <div className="filter-bar">
        {CATS.map((c) => (
          <button
            key={c}
            className={`pill ${filter === c ? "active" : ""}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📭</p>
          <p className="empty-title">No subscriptions here</p>
          <p className="empty-sub">
            {filter === "All"
              ? "Click '+ Add Subscription' to get started"
              : `No subscriptions in "${filter}" category`}
          </p>
        </div>
      ) : (
        <div className="sub-list">
          {filtered.map((s) => (
            <SubCard key={s.id} sub={s} onDelete={onDelete} />
          ))}
        </div>
      )}

      {subs.length > 0 && (
        <div className="list-footer">
          Showing {filtered.length} of {subs.length} subscriptions
        </div>
      )}
    </div>
  );
}
