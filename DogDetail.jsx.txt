const Row = ({ label, value }) => value ? (
  <div style={{ display: "flex", gap: 12, padding: "7px 0", borderBottom: "1px solid #f0ebe0" }}>
    <span style={{ fontSize: 12, color: "#7a6550", width: 160, flexShrink: 0, fontWeight: 600, paddingTop: 1 }}>{label}</span>
    <span style={{ fontSize: 13, color: "#2c1810", flex: 1 }}>{value}</span>
  </div>
) : null;

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 24 }}>
    <h3 style={{
      fontSize: 12, fontWeight: 700, color: "#7a6550", letterSpacing: "0.1em",
      textTransform: "uppercase", marginBottom: 10, paddingBottom: 5,
      borderBottom: "2px solid #e8ddc8",
    }}>{title}</h3>
    {children}
  </div>
);

const VaccRow = ({ label, date, expiry }) => {
  if (!date && !expiry) return null;
  const now = new Date();
  const exp = expiry ? new Date(expiry) : null;
  const expired = exp && exp < now;
  const soon = exp && !expired && (exp - now) / 86400000 < 30;
  return (
    <div style={{ display: "flex", gap: 12, padding: "7px 0", borderBottom: "1px solid #f0ebe0", alignItems: "center" }}>
      <span style={{ fontSize: 12, color: "#7a6550", width: 160, flexShrink: 0, fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 13, color: "#2c1810" }}>Given: {date || "—"}</span>
      {expiry && (
        <span style={{
          fontSize: 12, padding: "2px 8px", borderRadius: 12, marginLeft: 8,
          background: expired ? "#fee2e2" : soon ? "#fef3c7" : "#dcfce7",
          color: expired ? "#dc2626" : soon ? "#b45309" : "#15803d",
          fontWeight: 600,
        }}>
          {expired ? "⚠ Expired" : soon ? "⏰ Expires soon"  : "✓ Valid"} · {expiry}
        </span>
      )}
    </div>
  );
};

export default function DogDetail({ dog, onEdit, onDelete, onBack }) {
  const confirmDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${dog.name}'s record? This cannot be undone.`)) {
      onDelete();
    }
  };

  const STATUS_COLORS = {
    available: { bg: "#dcfce7", color: "#15803d" },
    adopted:   { bg: "#dbeafe", color: "#1d4ed8" },
    fostered:  { bg: "#ede9fe", color: "#7c3aed" },
    medical:   { bg: "#fee2e2", color: "#dc2626" },
    hold:      { bg: "#fef3c7", color: "#b45309" },
    deceased:  { bg: "#f3f4f6", color: "#6b7280" },
  };
  const sc = STATUS_COLORS[dog.status] || { bg: "#f5f0e8", color: "#7a6550" };

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={onBack} style={{
            background: "none", border: "none", color: "#7a6550", fontSize: 22, cursor: "pointer", lineHeight: 1,
          }}>←</button>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#2c1810" }}>{dog.name}</h2>
            <div style={{ display: "flex", gap: 10, marginTop: 4, alignItems: "center" }}>
              <span style={{ fontSize: 14, color: "#7a6550" }}>{dog.breed}{dog.mix ? ` / ${dog.mix}` : ""}</span>
              {dog.id_tag && <span style={{
                fontSize: 12, background: "#f5f0e8", color: "#4a3728",
                padding: "2px 8px", borderRadius: 6, fontFamily: "'JetBrains Mono', monospace",
              }}>#{dog.id_tag}</span>}
              <span style={{
                fontSize: 12, background: sc.bg, color: sc.color,
                padding: "3px 10px", borderRadius: 20, fontWeight: 700, textTransform: "capitalize",
              }}>{dog.status}</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onEdit} style={{
            padding: "9px 20px", border: "2px solid #2c1810", borderRadius: 8,
            background: "none", color: "#2c1810", fontSize: 14, fontWeight: 700,
          }}>✎ Edit</button>
          <button onClick={confirmDelete} style={{
            padding: "9px 16px", border: "2px solid #fca5a5", borderRadius: 8,
            background: "none", color: "#dc2626", fontSize: 14, fontWeight: 600,
          }}>Delete</button>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div>
            <Section title="Basic Info">
              <Row label="Sex" value={dog.sex} />
              <Row label="Age" value={dog.age_years != null ? `${dog.age_years} yr${dog.age_months ? ` ${dog.age_months} mo` : ""}` : null} />
              <Row label="Weight" value={dog.weight_lbs ? `${dog.weight_lbs} lbs` : null} />
              <Row label="Color" value={dog.color} />
              <Row label="Markings" value={dog.markings} />
              <Row label="Microchip" value={dog.microchip} />
            </Section>

            <Section title="Intake">
              <Row label="Intake Date" value={dog.intake_date} />
              <Row label="Reason" value={dog.intake_reason} />
              <Row label="Previous Owner" value={dog.owner_name} />
              <Row label="Owner Phone" value={dog.owner_phone} />
              <Row label="Owner Email" value={dog.owner_email} />
            </Section>

            <Section title="Diet">
              <Row label="Food / Diet" value={dog.diet} />
              <Row label="Feeding Schedule" value={dog.feeding_schedule} />
              <Row label="Allergies" value={dog.allergies} />
            </Section>

            <Section title="Behavior">
              <Row label="Good with Kids" value={dog.good_with_kids} />
              <Row label="Good with Dogs" value={dog.good_with_dogs} />
              <Row label="Good with Cats" value={dog.good_with_cats} />
              <Row label="Behavior Notes" value={dog.behavior_notes} />
              <Row label="Training Notes" value={dog.training_notes} />
            </Section>
          </div>

          <div>
            <Section title="Veterinary">
              <Row label="Vet / Clinic" value={dog.vet_name} />
              <Row label="Vet Phone" value={dog.vet_phone} />
              <Row label="Spayed / Neutered" value={dog.spayed_neutered} />
              <Row label="Heartworm Test" value={dog.heartworm_test_date} />
              <Row label="Heartworm Result" value={dog.heartworm_result} />
              <Row label="Flea/Tick Treatment" value={dog.flea_tick_treatment} />
              <Row label="Flea/Tick Date" value={dog.flea_tick_date} />
            </Section>

            <Section title="Vaccinations">
              <VaccRow label="Rabies" date={dog.vaccine_rabies_date} expiry={dog.vaccine_rabies_expiry} />
              <VaccRow label="Distemper" date={dog.vaccine_distemper_date} expiry={dog.vaccine_distemper_expiry} />
              <VaccRow label="Bordetella" date={dog.vaccine_bordetella_date} expiry={dog.vaccine_bordetella_expiry} />
              <VaccRow label="Leptospira" date={dog.vaccine_leptospira_date} expiry={dog.vaccine_leptospira_expiry} />
            </Section>

            <Section title="Medications">
              <div style={{ fontSize: 13, color: "#2c1810", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                {dog.medications || <span style={{ color: "#a08060" }}>None recorded</span>}
              </div>
            </Section>

            <Section title="Medical Notes">
              <div style={{ fontSize: 13, color: "#2c1810", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                {dog.medical_notes || <span style={{ color: "#a08060" }}>None recorded</span>}
              </div>
            </Section>

            <Section title="Adoption / Foster">
              <Row label="Date" value={dog.adoption_date} />
              <Row label="Adopter / Foster" value={dog.adopter_name} />
              <Row label="Phone" value={dog.adopter_phone} />
              <Row label="Email" value={dog.adopter_email} />
            </Section>

            {dog.notes && (
              <Section title="General Notes">
                <div style={{ fontSize: 13, color: "#2c1810", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{dog.notes}</div>
              </Section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
