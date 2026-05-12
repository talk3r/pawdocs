import { useState } from "react";

const SECTION = ({ title, children }) => (
  <div style={{ marginBottom: 28 }}>
    <h3 style={{
      fontSize: 13, fontWeight: 700, color: "#7a6550", letterSpacing: "0.1em",
      textTransform: "uppercase", marginBottom: 14, paddingBottom: 6,
      borderBottom: "2px solid #e8ddc8",
    }}>{title}</h3>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
      {children}
    </div>
  </div>
);

const Field = ({ label, name, value, onChange, type = "text", options, span, required }) => {
  const base = {
    width: "100%", padding: "9px 12px", border: "2px solid #d4c4a0",
    borderRadius: 8, fontSize: 13, background: "#fffdf7", outline: "none",
    fontFamily: "inherit", transition: "border-color 0.2s",
  };
  return (
    <div style={{ gridColumn: span ? `span ${span}` : "auto" }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#4a3728", marginBottom: 5 }}>
        {label}{required && <span style={{ color: "#dc2626" }}> *</span>}
      </label>
      {options ? (
        <select name={name} value={value || ""} onChange={onChange} style={base}>
          <option value="">— Select —</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea name={name} value={value || ""} onChange={onChange} rows={3}
          style={{ ...base, resize: "vertical" }} />
      ) : (
        <input type={type} name={name} value={value || ""} onChange={onChange}
          style={base}
          onFocus={e => e.target.style.borderColor = "#2c1810"}
          onBlur={e => e.target.style.borderColor = "#d4c4a0"}
        />
      )}
    </div>
  );
};

const EMPTY = {
  name: "", id_tag: "", breed: "", mix: "", sex: "", age_years: "", age_months: "",
  weight_lbs: "", color: "", markings: "", microchip: "",
  status: "available", intake_date: "", intake_reason: "",
  owner_name: "", owner_phone: "", owner_email: "",
  vet_name: "", vet_phone: "",
  vaccine_rabies_date: "", vaccine_rabies_expiry: "",
  vaccine_distemper_date: "", vaccine_distemper_expiry: "",
  vaccine_bordetella_date: "", vaccine_bordetella_expiry: "",
  vaccine_leptospira_date: "", vaccine_leptospira_expiry: "",
  spayed_neutered: "", heartworm_test_date: "", heartworm_result: "",
  flea_tick_treatment: "", flea_tick_date: "",
  medications: "", medical_notes: "",
  diet: "", feeding_schedule: "", allergies: "",
  behavior_notes: "", training_notes: "", good_with_kids: "", good_with_dogs: "", good_with_cats: "",
  adoption_date: "", adopter_name: "", adopter_phone: "", adopter_email: "",
  notes: "",
};

export default function DogForm({ dog, onSave, onCancel }) {
  const [form, setForm] = useState(dog ? { ...EMPTY, ...dog } : { ...EMPTY });
  const [saving, setSaving] = useState(false);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async () => {
    if (!form.name.trim()) return alert("Name is required");
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#2c1810" }}>
          {dog ? `Edit: ${dog.name}` : "Add New Dog"}
        </h2>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel} style={{
            padding: "9px 18px", border: "2px solid #d4c4a0", borderRadius: 8,
            background: "none", color: "#7a6550", fontSize: 14, fontWeight: 600,
          }}>Cancel</button>
          <button onClick={submit} disabled={saving} style={{
            padding: "9px 22px", border: "none", borderRadius: 8,
            background: saving ? "#c9b99a" : "#2c1810", color: "#e8c97a",
            fontSize: 14, fontWeight: 700,
          }}>{saving ? "Saving…" : "Save Dog"}</button>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <SECTION title="Basic Information">
          <Field label="Name" name="name" value={form.name} onChange={handle} required />
          <Field label="ID Tag / Kennel #" name="id_tag" value={form.id_tag} onChange={handle} />
          <Field label="Breed" name="breed" value={form.breed} onChange={handle} />
          <Field label="Mix / Secondary Breed" name="mix" value={form.mix} onChange={handle} />
          <Field label="Sex" name="sex" value={form.sex} onChange={handle} options={["Male", "Female"]} />
          <Field label="Age (Years)" name="age_years" value={form.age_years} onChange={handle} type="number" />
          <Field label="Age (Months)" name="age_months" value={form.age_months} onChange={handle} type="number" />
          <Field label="Weight (lbs)" name="weight_lbs" value={form.weight_lbs} onChange={handle} type="number" />
          <Field label="Color" name="color" value={form.color} onChange={handle} />
          <Field label="Markings" name="markings" value={form.markings} onChange={handle} />
          <Field label="Microchip #" name="microchip" value={form.microchip} onChange={handle} />
          <Field label="Status" name="status" value={form.status} onChange={handle}
            options={["available", "adopted", "fostered", "medical", "hold", "deceased"]} />
        </SECTION>

        <SECTION title="Intake">
          <Field label="Intake Date" name="intake_date" value={form.intake_date} onChange={handle} type="date" />
          <Field label="Intake Reason" name="intake_reason" value={form.intake_reason} onChange={handle}
            options={["Stray", "Owner surrender", "Transfer", "Born in shelter", "Confiscated", "Other"]} />
          <Field label="Previous Owner Name" name="owner_name" value={form.owner_name} onChange={handle} />
          <Field label="Previous Owner Phone" name="owner_phone" value={form.owner_phone} onChange={handle} />
          <Field label="Previous Owner Email" name="owner_email" value={form.owner_email} onChange={handle} type="email" />
        </SECTION>

        <SECTION title="Veterinary">
          <Field label="Vet Name / Clinic" name="vet_name" value={form.vet_name} onChange={handle} />
          <Field label="Vet Phone" name="vet_phone" value={form.vet_phone} onChange={handle} />
          <Field label="Spayed / Neutered" name="spayed_neutered" value={form.spayed_neutered} onChange={handle}
            options={["Yes", "No", "Unknown", "Scheduled"]} />
          <Field label="Heartworm Test Date" name="heartworm_test_date" value={form.heartworm_test_date} onChange={handle} type="date" />
          <Field label="Heartworm Result" name="heartworm_result" value={form.heartworm_result} onChange={handle}
            options={["Negative", "Positive", "Unknown"]} />
          <Field label="Flea/Tick Treatment" name="flea_tick_treatment" value={form.flea_tick_treatment} onChange={handle} />
          <Field label="Flea/Tick Treatment Date" name="flea_tick_date" value={form.flea_tick_date} onChange={handle} type="date" />
        </SECTION>

        <SECTION title="Vaccinations">
          <Field label="Rabies Date" name="vaccine_rabies_date" value={form.vaccine_rabies_date} onChange={handle} type="date" />
          <Field label="Rabies Expiry" name="vaccine_rabies_expiry" value={form.vaccine_rabies_expiry} onChange={handle} type="date" />
          <Field label="Distemper Date" name="vaccine_distemper_date" value={form.vaccine_distemper_date} onChange={handle} type="date" />
          <Field label="Distemper Expiry" name="vaccine_distemper_expiry" value={form.vaccine_distemper_expiry} onChange={handle} type="date" />
          <Field label="Bordetella Date" name="vaccine_bordetella_date" value={form.vaccine_bordetella_date} onChange={handle} type="date" />
          <Field label="Bordetella Expiry" name="vaccine_bordetella_expiry" value={form.vaccine_bordetella_expiry} onChange={handle} type="date" />
          <Field label="Leptospira Date" name="vaccine_leptospira_date" value={form.vaccine_leptospira_date} onChange={handle} type="date" />
          <Field label="Leptospira Expiry" name="vaccine_leptospira_expiry" value={form.vaccine_leptospira_expiry} onChange={handle} type="date" />
        </SECTION>

        <SECTION title="Medications & Medical Notes">
          <Field label="Current Medications & Dosage" name="medications" value={form.medications} onChange={handle} type="textarea" span={2} />
          <Field label="Medical Notes / History" name="medical_notes" value={form.medical_notes} onChange={handle} type="textarea" span={2} />
        </SECTION>

        <SECTION title="Diet & Feeding">
          <Field label="Food / Diet" name="diet" value={form.diet} onChange={handle} />
          <Field label="Feeding Schedule" name="feeding_schedule" value={form.feeding_schedule} onChange={handle} />
          <Field label="Allergies" name="allergies" value={form.allergies} onChange={handle} />
        </SECTION>

        <SECTION title="Behavior & Temperament">
          <Field label="Good with Kids?" name="good_with_kids" value={form.good_with_kids} onChange={handle} options={["Yes", "No", "Unknown", "Supervised only"]} />
          <Field label="Good with Dogs?" name="good_with_dogs" value={form.good_with_dogs} onChange={handle} options={["Yes", "No", "Unknown", "Selective"]} />
          <Field label="Good with Cats?" name="good_with_cats" value={form.good_with_cats} onChange={handle} options={["Yes", "No", "Unknown"]} />
          <Field label="Behavior Notes" name="behavior_notes" value={form.behavior_notes} onChange={handle} type="textarea" span={2} />
          <Field label="Training Notes" name="training_notes" value={form.training_notes} onChange={handle} type="textarea" span={2} />
        </SECTION>

        <SECTION title="Adoption / Foster Info">
          <Field label="Adoption / Foster Date" name="adoption_date" value={form.adoption_date} onChange={handle} type="date" />
          <Field label="Adopter / Foster Name" name="adopter_name" value={form.adopter_name} onChange={handle} />
          <Field label="Adopter / Foster Phone" name="adopter_phone" value={form.adopter_phone} onChange={handle} />
          <Field label="Adopter / Foster Email" name="adopter_email" value={form.adopter_email} onChange={handle} type="email" />
        </SECTION>

        <SECTION title="General Notes">
          <Field label="Additional Notes" name="notes" value={form.notes} onChange={handle} type="textarea" span={3} />
        </SECTION>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
        <button onClick={onCancel} style={{
          padding: "11px 22px", border: "2px solid #d4c4a0", borderRadius: 8,
          background: "none", color: "#7a6550", fontSize: 14, fontWeight: 600,
        }}>Cancel</button>
        <button onClick={submit} disabled={saving} style={{
          padding: "11px 26px", border: "none", borderRadius: 8,
          background: saving ? "#c9b99a" : "#2c1810", color: "#e8c97a",
          fontSize: 15, fontWeight: 700,
        }}>{saving ? "Saving…" : "Save Dog"}</button>
      </div>
    </div>
  );
}
