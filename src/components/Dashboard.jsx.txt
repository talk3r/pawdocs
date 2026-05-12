const CARD = ({ label, value, sub, color = "#2c1810", bg = "#fff" }) => (
  <div style={{
    background: bg, borderRadius: 12, padding: "18px 20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)", flex: 1, minWidth: 130,
  }}>
    <div style={{ fontSize: 28, fontWeight: 700, color, fontFamily: "'Lora', serif" }}>{value}</div>
    <div style={{ fontSize: 13, fontWeight: 600, color: "#2c1810", marginTop: 2 }}>{label}</div>
    {sub && <div style={{ fontSize: 11, color: "#7a6550", marginTop: 4 }}>{sub}</div>}
  </div>
);

export default function Dashboard({ dogs, onNavigate }) {
  const now = new Date();
  const in30 = new Date(now); in30.setDate(in30.getDate() + 30);

  const total = dogs.length;
  const adopted = dogs.filter(d => d.status === "adopted").length;
  const available = dogs.filter(d => d.status === "available").length;
  const medical = dogs.filter(d => d.status === "medical").length;
  const fostered = dogs.filter(d => d.status === "fostered").length;

  const vaccExpiring = dogs.filter(d => {
    if (!d.vaccine_rabies_expiry) return false;
    const exp = new Date(d.vaccine_rabies_expiry);
    return exp >= now && exp <= in30;
  });

  const vaccExpired = dogs.filter(d => {
    if (!d.vaccine_rabies_expiry) return false;
    return new Date(d.vaccine_rabies_expiry) < now;
  });

  const onMeds = dogs.filter(d => d.medications && d.medications.trim() !== "");
  const recentIntake = [...dogs].sort((a, b) => new Date(b.intake_date) - new Date(a.intake_date)).slice(0, 5);

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: "#2c1810", marginBottom: 20 }}>Dashboard</h2>

      {/* Stats */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        <CARD label="Total Dogs" value={total} />
        <CARD label="Available" value={available} color="#15803d" bg="#f0fdf4" />
        <CARD label="Adopted" value={adopted} color="#1d4ed8" bg="#eff6ff" />
        <CARD label="Fostered" value={fostered} color="#7c3aed" bg="#faf5ff" />
        <CARD label="Medical Hold" value={medical} color="#dc2626" bg="#fef2f2" />
        <CARD label="On Medication" value={onMeds.length} color="#b45309" bg="#fffbeb" />
      </div>

      {/* Alerts */}
      {(vaccExpired.length > 0 || vaccExpiring.length > 0) && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#2c1810", marginBottom: 12 }}>⚠ Vaccination Alerts</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {vaccExpired.length > 0 && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#dc2626", marginBottom: 10 }}>🔴 Rabies Expired ({vaccExpired.length})</div>
                {vaccExpired.slice(0, 6).map(d => (
                  <div key={d.id} onClick={() => onNavigate(d)} style={{
                    fontSize: 13, color: "#991b1b", padding: "4px 0",
                    borderBottom: "1px solid #fee2e2", cursor: "pointer",
                    display: "flex", justifyContent: "space-between",
                  }}>
                    <span>{d.name}</span>
                    <span style={{ fontSize: 11, color: "#b91c1c" }}>{d.vaccine_rabies_expiry}</span>
                  </div>
                ))}
                {vaccExpired.length > 6 && <div style={{ fontSize: 11, color: "#b91c1c", marginTop: 6 }}>+{vaccExpired.length - 6} more</div>}
              </div>
            )}
            {vaccExpiring.length > 0 && (
              <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#b45309", marginBottom: 10 }}>🟡 Expiring in 30 days ({vaccExpiring.length})</div>
                {vaccExpiring.slice(0, 6).map(d => (
                  <div key={d.id} onClick={() => onNavigate(d)} style={{
                    fontSize: 13, color: "#92400e", padding: "4px 0",
                    borderBottom: "1px solid #fde68a", cursor: "pointer",
                    display: "flex", justifyContent: "space-between",
                  }}>
                    <span>{d.name}</span>
                    <span style={{ fontSize: 11 }}>{d.vaccine_rabies_expiry}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Intakes */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#2c1810", marginBottom: 14 }}>Recent Intakes</h3>
        {recentIntake.length === 0 ? (
          <p style={{ color: "#7a6550", fontSize: 14 }}>No dogs yet — add your first dog!</p>
        ) : recentIntake.map(d => (
          <div key={d.id} onClick={() => onNavigate(d)} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 0", borderBottom: "1px solid #f0ebe0", cursor: "pointer",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#faf7f0"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div>
              <span style={{ fontWeight: 600, color: "#2c1810", fontSize: 14 }}>{d.name}</span>
              <span style={{ color: "#7a6550", fontSize: 13, marginLeft: 10 }}>{d.breed}</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <StatusBadge status={d.status} />
              <span style={{ fontSize: 12, color: "#a08060", fontFamily: "'JetBrains Mono', monospace" }}>{d.intake_date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = {
    available: { bg: "#dcfce7", color: "#15803d" },
    adopted:   { bg: "#dbeafe", color: "#1d4ed8" },
    fostered:  { bg: "#ede9fe", color: "#7c3aed" },
    medical:   { bg: "#fee2e2", color: "#dc2626" },
    hold:      { bg: "#fef3c7", color: "#b45309" },
    deceased:  { bg: "#f3f4f6", color: "#6b7280" },
  }[status] || { bg: "#f5f0e8", color: "#7a6550" };
  return (
    <span style={{
      background: cfg.bg, color: cfg.color, padding: "3px 10px",
      borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: "capitalize",
    }}>{status || "—"}</span>
  );
}
