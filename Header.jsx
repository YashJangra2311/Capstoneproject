import "./Header.css";

export default function Header({ onAdd }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">₹</span>
          <span className="logo-text">
            Sub<span className="logo-accent">Track</span>
          </span>
        </div>
        <div className="header-right">
          <p className="header-subtitle">Subscription Manager</p>
          <button className="add-btn" onClick={onAdd}>
            + Add Subscription
          </button>
        </div>
      </div>
    </header>
  );
}
