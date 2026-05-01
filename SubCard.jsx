import { useState } from "react";
import { CAT_COLORS, CAT_ICONS } from "../constants";
import "./SubCard.css";

export default function SubCard({ sub, onDelete }) {
  const [confirm, setConfirm] = useState(false);

  const annual =
    sub.cycle === "yearly"
      ? sub.price
      : sub.cycle === "quarterly"
      ? sub.price * 4
      : sub.price * 12;

  const daysLeft = sub.next !== "TBD"
    ? Math.max(0, Math.ceil((new Date(sub.next) - new Date()) / (1000 * 60 * 60 * 24)))
    : null;

  const urgency = daysLeft !== null && daysLeft <= 3;

  return (
    <div className={`sub-card ${urgency ? "urgent" : ""}`}>
      <div
        className="sub-icon"
        style={{ background: CAT_COLORS[sub.cat] }}
      >
        {sub.emoji || CAT_ICONS[sub.cat]}
      </div>

      <div className="sub-info">
        <p className="sub-name">{sub.name}</p>
        <p className="sub-meta">
          <span className="cat-badge">{sub.cat}</span>
          {daysLeft !== null && (
            <span className={`renew-badge ${urgency ? "urgent" : ""}`}>
              {daysLeft === 0 ? "Due today!" : `${daysLeft}d left`}
            </span>
          )}
        </p>
        <p className="sub-date">Renews: {sub.next}</p>
      </div>

      <div className="sub-right">
        <p className="sub-price">₹{sub.price.toLocaleString("en-IN")}</p>
        <p className="sub-cycle">/{sub.cycle}</p>
        <p className="sub-annual">₹{annual.toLocaleString("en-IN")}/yr</p>

        <div className="card-actions">
          {confirm ? (
            <>
              <button
                className="action-btn confirm-del"
                onClick={() => onDelete(sub.id)}
              >
                Yes, remove
              </button>
              <button
                className="action-btn"
                onClick={() => setConfirm(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="action-btn del-btn"
              onClick={() => setConfirm(true)}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
