import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import DogList from "./components/DogList";
import DogForm from "./components/DogForm";
import DogDetail from "./components/DogDetail";
import Dashboard from "./components/Dashboard";
import Setup from "./components/Setup";

const getSupabase = () => {
  const url = localStorage.getItem("sb_url");
  const key = localStorage.getItem("sb_key");
  if (!url || !key) return null;
  return createClient(url, key);
};

export default function App() {
  const [supabase, setSupabase] = useState(getSupabase);
  const [view, setView] = useState("dashboard"); // dashboard | list | add | detail | edit
  const [dogs, setDogs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchDogs = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("dogs")
      .select("*")
      .order("name");
    if (!error) setDogs(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (supabase) fetchDogs();
  }, [supabase]);

  const handleConnect = (url, key) => {
    localStorage.setItem("sb_url", url);
    localStorage.setItem("sb_key", key);
    setSupabase(createClient(url, key));
  };

  const handleDisconnect = () => {
    localStorage.removeItem("sb_url");
    localStorage.removeItem("sb_key");
    setSupabase(null);
    setDogs([]);
  };

  const handleSave = async (dogData) => {
    if (!supabase) return;
    if (dogData.id) {
      const { error } = await supabase.from("dogs").update(dogData).eq("id", dogData.id);
      if (!error) { showToast("Dog updated!"); fetchDogs(); setView("detail"); }
      else showToast("Error saving: " + error.message, "error");
    } else {
      const { error } = await supabase.from("dogs").insert([dogData]);
      if (!error) { showToast("Dog added!"); fetchDogs(); setView("list"); }
      else showToast("Error adding: " + error.message, "error");
    }
  };

  const handleDelete = async (id) => {
    if (!supabase) return;
    const { error } = await supabase.from("dogs").delete().eq("id", id);
    if (!error) { showToast("Dog removed"); fetchDogs(); setView("list"); setSelected(null); }
    else showToast("Error: " + error.message, "error");
  };

  const filteredDogs = dogs.filter(d => {
    const matchSearch = d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.breed?.toLowerCase().includes(search.toLowerCase()) ||
      d.id_tag?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || d.status === filterStatus;
    return matchSearch && matchStatus;
  });

  if (!supabase) return <Setup onConnect={handleConnect} />;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", fontFamily: "'Lora', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { cursor: pointer; font-family: inherit; }
        input, textarea, select { font-family: inherit; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #c9b99a; border-radius: 3px; }
        @keyframes slideUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:none } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important; }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 16, right: 16, zIndex: 9999,
          background: toast.type === "error" ? "#dc2626" : "#15803d",
          color: "#fff", padding: "12px 20px", borderRadius: 10,
          fontSize: 14, fontFamily: "'JetBrains Mono', monospace",
          animation: "slideUp 0.3s ease", boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}>{toast.msg}</div>
      )}

      {/* Nav */}
      <nav style={{
        background: "#2c1810", color: "#f5f0e8",
        padding: "0 20px", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 58,
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>🐕 PawDocs</span>
          {["dashboard", "list"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              background: "none", border: "none", color: view === v ? "#e8c97a" : "rgba(245,240,232,0.55)",
              fontSize: 14, fontWeight: 500, padding: "4px 0",
              borderBottom: view === v ? "2px solid #e8c97a" : "2px solid transparent",
              transition: "all 0.2s",
            }}>
              {v === "dashboard" ? "Dashboard" : "All Dogs"}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "rgba(245,240,232,0.35)", fontFamily: "'JetBrains Mono', monospace" }}>
            {dogs.length} dogs
          </span>
          <button onClick={() => { setSelected(null); setView("add"); }} style={{
            background: "#e8c97a", color: "#2c1810", border: "none",
            padding: "8px 16px", borderRadius: 8, fontWeight: 600, fontSize: 13,
          }}>+ Add Dog</button>
          <button onClick={handleDisconnect} style={{
            background: "none", border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(245,240,232,0.5)", padding: "6px 12px", borderRadius: 8, fontSize: 12,
          }}>Disconnect</button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
        {view === "dashboard" && (
          <Dashboard dogs={dogs} onNavigate={(dog) => { setSelected(dog); setView("detail"); }} />
        )}
        {view === "list" && (
          <DogList
            dogs={filteredDogs}
            loading={loading}
            search={search}
            setSearch={setSearch}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            onSelect={(dog) => { setSelected(dog); setView("detail"); }}
            onAdd={() => { setSelected(null); setView("add"); }}
          />
        )}
        {(view === "add" || view === "edit") && (
          <DogForm
            dog={selected}
            onSave={handleSave}
            onCancel={() => setView(selected ? "detail" : "list")}
          />
        )}
        {view === "detail" && selected && (
          <DogDetail
            dog={dogs.find(d => d.id === selected.id) || selected}
            onEdit={() => setView("edit")}
            onDelete={() => handleDelete(selected.id)}
            onBack={() => setView("list")}
          />
        )}
      </div>
    </div>
  );
            }
