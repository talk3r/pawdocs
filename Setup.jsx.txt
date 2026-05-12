import { useState } from "react";

export default function Setup({ onConnect }) {
  const [url, setUrl] = useState("");
  const [key, setKey] = useState("");
  const [step, setStep] = useState(1);

  const field = (label, val, setVal, placeholder, type = "text") => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#2c1810", marginBottom: 6 }}>{label}</label>
      <input
        type={type} value={val} onChange={e => setVal(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "10px 14px", border: "2px solid #d4c4a0",
          borderRadius: 8, fontSize: 13, background: "#fffdf7",
          fontFamily: "'JetBrains Mono', monospace", outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={e => e.target.style.borderColor = "#2c1810"}
        onBlur={e => e.target.style.borderColor = "#d4c4a0"}
      />
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh", background: "#f5f0e8",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, fontFamily: "'Lora', serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`}</style>
      <div style={{ maxWidth: 540, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🐕</div>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: "#2c1810", marginBottom: 8 }}>PawDocs</h1>
          <p style={{ color: "#7a6550", fontSize: 15 }}>Dog Documentation System — connect your Supabase database to get started.</p>
        </div>

        {/* Steps */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 28, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 0, marginBottom: 24 }}>
            {[1, 2].map(s => (
              <button key={s} onClick={() => setStep(s)} style={{
                flex: 1, padding: "8px 0", border: "none",
                background: step === s ? "#2c1810" : "#f5f0e8",
                color: step === s ? "#f5f0e8" : "#7a6550",
                fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 13,
                borderRadius: s === 1 ? "8px 0 0 8px" : "0 8px 8px 0",
                cursor: "pointer",
              }}>
                Step {s}: {s === 1 ? "Setup Database" : "Connect App"}
              </button>
            ))}
          </div>

          {step === 1 && (
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#2c1810", marginBottom: 16 }}>Set up your free Supabase database</h3>
              {[
                { n: 1, text: "Go to supabase.com and click 'Start your project' (free account)" },
                { n: 2, text: "Create a new project — pick any name like 'pawdocs'" },
                { n: 3, text: "Once the project loads, go to the SQL Editor (left sidebar)" },
                { n: 4, text: "Paste and run the SQL from the setup.sql file included below" },
                { n: 5, text: "Go to Settings → API to find your Project URL and anon key" },
              ].map(s => (
                <div key={s.n} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%", background: "#2c1810",
                    color: "#e8c97a", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, flexShrink: 0,
                  }}>{s.n}</div>
                  <span style={{ fontSize: 14, color: "#4a3728", lineHeight: 1.6 }}>{s.text}</span>
                </div>
              ))}
              <button onClick={() => setStep(2)} style={{
                marginTop: 8, width: "100%", padding: "12px 0",
                background: "#2c1810", color: "#e8c97a", border: "none",
                borderRadius: 8, fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 15,
              }}>Next: Connect →</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#2c1810", marginBottom: 4 }}>Enter your Supabase credentials</h3>
              <p style={{ fontSize: 13, color: "#7a6550", marginBottom: 20 }}>Find these in your Supabase project under Settings → API</p>
              {field("Project URL", url, setUrl, "https://xxxxxxxxxxxx.supabase.co")}
              {field("Anon/Public Key", key, setKey, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")}
              <button
                onClick={() => url && key && onConnect(url, key)}
                disabled={!url || !key}
                style={{
                  width: "100%", padding: "13px 0",
                  background: url && key ? "#2c1810" : "#c9b99a",
                  color: "#e8c97a", border: "none", borderRadius: 8,
                  fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 15,
                  transition: "background 0.2s",
                }}>
                Connect Database →
              </button>
            </div>
          )}
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#a08060" }}>
          Your data stays in YOUR Supabase account. PawDocs never stores it elsewhere.
        </p>
      </div>
    </div>
  );
}
