const STATUS_COLORS = {
  available: { bg: "#dcfce7", color: "#15803d" },
  adopted:   { bg: "#dbeafe", color: "#1d4ed8" },
  fostered:  { bg: "#ede9fe", color: "#7c3aed" },
  medical:   { bg: "#fee2e2", color: "#dc2626" },
  hold:      { bg: "#fef3c7", color: "#b45309" },
  deceased:  { bg: "#f3f4f6", color: "#6b7280" },
};

function StatusBadge({ status }) {
  const cfg = STATUS_COLORS[status] || { bg: "#f5f0e8", color: "#7a6550" };
  return (
    <span style={{
      background: cfg.bg, color: cfg.color, padding: "3px 10px",
      borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: "capitalize",
    }}>{status || "unknown"}</span>
  );
}

export default function DogList({ dogs, loading, search, setSearch, filterStatus, setFilterStatus, onSelect, onAdd }) {
  const STATUSES = ["all", "available", "adopted", "fostered", "medical", "hold", "deceased"];

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      {/* Search + filter bar */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, breed, or ID tag…"
          style={{
            flex: 1, minWidth: 220, padding: "10px 14px",
            border: "2px solid #d4c4a0", borderRadius: 8,
            fontSize: 14, background: "#fff", outline: "none",
          }}
          onFocus={e => e.target.style.borderColor = "#2c1810"}
          onBlur={e => e.target.style.borderColor = "#d4c4a0"}
        />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{
          padding: "10px 14px", border: "2px solid #d4c4a0", borderRadius: 8,
          fontSize: 14, background: "#fff", color: "#2c1810", outline: "none",
        }}>
          {STATUSES.map(s => <option key={s} value={s}>{s === "all" ? "All Statuses" : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <span style={{ fontSize: 13, color: "#7a6550", whiteSpace: "nowrap" }}>{dogs.length} dogs</span>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "#7a6550" }}>Loading dogs…</div>
      ) : dogs.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🐾</div>
          <p style={{ color: "#7a6550", fontSize: 15 }}>No dogs found. <button onClick={onAdd} style={{ background: "none", border: "none", color: "#2c1810", fontWeight: 700, textDecoration: "underline", cursor: "pointer", fontSize: 15 }}>Add the first one!</button></p>
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          {/* Table Header */}
          <div style={{
            display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 1fr",
            padding: "10px 18px", background: "#2c1810", color: "#e8c97a",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
          }}>
            <span>NAME / BREED</span>
            <span>ID TAG</span>
            <span>AGE</span>
            <span>SEX</span>
            <span>STATUS</span>
            <span>INTAKE DATE</span>
          </div>
          {dogs.map((dog, i) => (
            <div key={dog.id} onClick={() => onSelect(dog)} style={{
              display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 1fr",
              padding: "12px 18px",
              background: i % 2 === 0 ? "#fff" : "#faf7f0",
              borderBottom: "1px solid #f0ebe0",
              cursor: "pointer", transition: "background 0.15s",
              alignItems: "center",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#f5f0e8"}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#faf7f0"}
            >
              <div>
                <div style={{ fontWeight: 600, color: "#2c1810", fontSize: 14 }}>{dog.name}</div>
                <div style={{ fontSize: 12, color: "#7a6550" }}>{dog.breed || "—"}</div>
              </div>
              <span style={{ fontSize: 13, color: "#4a3728", fontFamily: "'JetBrains Mono', monospace" }}>{dog.id_tag || "—"}</span>
              <span style={{ fontSize: 13, color: "#4a3728" }}>{dog.age_years != null ? `${dog.age_years}y` : "—"}{dog.age_months ? ` ${dog.age_months}m` : ""}</span>
              <span style={{ fontSize: 13, color: "#4a3728", textTransform: "capitalize" }}>{dog.sex || "—"}</span>
              <StatusBadge status={dog.status} />
              <span style={{ fontSize: 12, color: "#7a6550", fontFamily: "'JetBrains Mono', monospace" }}>{dog.intake_date || "—"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
