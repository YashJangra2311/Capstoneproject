import { useState } from "react";
import { ALL_CATS, CAT_ICONS } from "../constants";
import "./AddModal.css";

const DEFAULT_FORM = {
  name: "",
  cat: "Streaming",
  price: "",
  cycle: "monthly",
  next: "",
};

export default function AddModal({ onAdd, onClose }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [error, setError] = useState("");

  const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const handleSubmit = () => {
    if (!form.name.trim()) return setError("Please enter a subscription name.");
    if (!form.price || isNaN(form.price) || parseInt(form.price) <= 0)
      return setError("Please enter a valid price.");
    setError("");
    onAdd({
      name: form.name.trim(),
      cat: form.cat,
      price: parseInt(form.price),
      cycle: form.cycle,
      next: form.next || "TBD",
      emoji: CAT_ICONS[form.cat],
    });
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2>Add Subscription</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <div className="form-body">
          <div className="form-group">
            <label>Subscription Name</label>
            <input
              placeholder="e.g. Disney+ Hotstar"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select value={form.cat} onChange={(e) => set("cat", e.target.value)}>
                {ALL_CATS.map((c) => (
                  <option key={c} value={c}>
                    {CAT_ICONS[c]} {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Billing Cycle</label>
              <select value={form.cycle} onChange={(e) => set("cycle", e.target.value)}>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <div className="price-wrap">
              <span className="price-prefix">₹</span>
              <input
                type="number"
                className="price-input"
                placeholder="e.g. 499"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Next Renewal Date</label>
            <input
              type="date"
              value={form.next}
              onChange={(e) => set("next", e.target.value)}
            />
          </div>

          {form.name && form.price && (
            <div className="preview-box">
              <span>{CAT_ICONS[form.cat]} {form.name}</span>
              <span>
                ₹{parseInt(form.price || 0).toLocaleString("en-IN")}/{form.cycle}
              </span>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="submit-btn" onClick={handleSubmit}>
            Add Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
