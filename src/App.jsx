import { useState, useEffect } from "react";

const C = {
  bg: "#f0f7f6", surface: "#ffffff", primary: "#1a7f72",
  primaryDark: "#145f55", primaryLight: "#e6f4f2",
  accent: "#2ab8a6", text: "#0f2e2b", textMid: "#3d6b65",
  textLight: "#7aa8a2", border: "#cce8e4", teal: "#0d9488",
};

// ── Data ──────────────────────────────────────────────────────────────────────
const skills = [
  { id: 1, name: "Marcus R.", avatar: "MR", skill: "Plumbing & Pipe Repair",   rating: 4.9, reviews: 47, price: "€25/hr", distance: "0.3 km", tag: "Urgent",  category: "home",     available: true,  bio: "10+ years fixing everything from drips to full remodels.", verified: true  },
  { id: 2, name: "Sophie L.", avatar: "SL", skill: "French Pastry & Baking",   rating: 5.0, reviews: 31, price: "Free",    distance: "0.7 km", tag: "Free",    category: "food",     available: true,  bio: "Trained in Lyon. I teach sourdough, croissants & tarts.", verified: true  },
  { id: 3, name: "Yusuf A.",  avatar: "YA", skill: "Guitar & Music Theory",     rating: 4.8, reviews: 62, price: "€15/hr", distance: "1.1 km", tag: "Popular", category: "music",    available: true,  bio: "Professional guitarist. All levels welcome, kids too.",   verified: false },
  { id: 4, name: "Chen W.",   avatar: "CW", skill: "Web Dev & Coding Help",     rating: 4.7, reviews: 89, price: "€30/hr", distance: "0.5 km", tag: "Pro",     category: "tech",     available: false, bio: "Senior dev at startup. JS, Python, React, all things web.", verified: true },
  { id: 5, name: "Aïsha D.", avatar: "AD", skill: "Childcare & Tutoring",      rating: 5.0, reviews: 28, price: "€18/hr", distance: "0.2 km", tag: "Trusted", category: "care",     available: true,  bio: "Former primary school teacher, 7 years experience.",      verified: true  },
  { id: 6, name: "Tomás V.", avatar: "TV", skill: "Furniture & Moving Help",   rating: 4.6, reviews: 53, price: "€20/hr", distance: "1.4 km", tag: null,      category: "home",     available: true,  bio: "I'll tackle any IKEA nightmare. Truck available weekends.", verified: false },
  { id: 7, name: "Lena K.",   avatar: "LK", skill: "Yoga & Mindfulness",        rating: 4.9, reviews: 44, price: "Free",    distance: "0.9 km", tag: "Free",    category: "wellness", available: true,  bio: "200hr certified. Morning sessions in the park, all welcome.", verified: true },
  { id: 8, name: "Rafi B.",   avatar: "RB", skill: "Car Maintenance & Advice",  rating: 4.8, reviews: 37, price: "€22/hr", distance: "1.8 km", tag: null,      category: "auto",     available: true,  bio: "Mechanic by trade. Diagnose, fix, or just give advice.",  verified: false },
];

const categories = [
  { id: "all", label: "All" }, { id: "home", label: "Home" },
  { id: "food", label: "Food" }, { id: "tech", label: "Tech" },
  { id: "music", label: "Music" }, { id: "care", label: "Care" },
  { id: "wellness", label: "Wellness" }, { id: "auto", label: "Auto" },
];

const tagStyle = {
  "Urgent": { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
  "Free":   { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  "Popular":{ bg: "#fffbeb", color: "#d97706", border: "#fde68a" },
  "Pro":    { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  "Trusted":{ bg: "#e6f4f2", color: "#1a7f72", border: "#cce8e4" },
};

const messagesData = [
  { id: 1, avatar: "SL", name: "Sophie L.", preview: "Sure! Saturday morning works great for me.",       skill: "French Pastry & Baking",  unread: true  },
  { id: 2, avatar: "MR", name: "Marcus R.", preview: "I can come by Thursday around 4pm if that suits?", skill: "Plumbing & Pipe Repair",  unread: true  },
  { id: 3, avatar: "YA", name: "Yusuf A.",  preview: "Thanks for the request! What level are you at?",  skill: "Guitar & Music Theory",   unread: false },
  { id: 4, avatar: "LK", name: "Lena K.",   preview: "We meet at the park every Tuesday at 7am 🌿",     skill: "Yoga & Mindfulness",      unread: false },
];

const requestsData = [
  { id: 1, avatar: "MR", name: "Marcus R.", skill: "Plumbing & Pipe Repair", status: "pending",   date: "Today",       price: "€25/hr", note: "Leaky pipe under the kitchen sink." },
  { id: 2, avatar: "SL", name: "Sophie L.", skill: "French Pastry & Baking", status: "confirmed", date: "Sat, 14 Jun", price: "Free",   note: "Croissant workshop for 2 people." },
  { id: 3, avatar: "YA", name: "Yusuf A.",  skill: "Guitar & Music Theory",  status: "completed", date: "Mon, 9 Jun",  price: "€15/hr", note: "Beginner lesson, 1 hour." },
  { id: 4, avatar: "CW", name: "Chen W.",   skill: "Web Dev & Coding Help",  status: "cancelled", date: "Fri, 6 Jun",  price: "€30/hr", note: "Help debugging a React app." },
];

const statusStyle = {
  pending:   { bg: "#fffbeb", color: "#d97706", border: "#fde68a", label: "Pending"   },
  confirmed: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0", label: "Confirmed" },
  completed: { bg: "#e6f4f2", color: "#1a7f72", border: "#cce8e4", label: "Completed" },
  cancelled: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca", label: "Cancelled" },
};

// ── Tab icons ─────────────────────────────────────────────────────────────────
const TabIcon = ({ id, active }) => {
  const col = active ? C.primary : C.textLight;
  const s = { display: "block" };
  switch (id) {
    case "explore": return (
      <svg style={s} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    );
    case "messages": return (
      <svg style={s} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    );
    case "requests": return (
      <svg style={s} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    );
    case "favourites": return (
      <svg style={s} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    );
    case "profile": return (
      <svg style={s} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    );
    default: return null;
  }
};

const navTabs = [
  { id: "explore",    label: "Explore"  },
  { id: "messages",   label: "Messages" },
  { id: "requests",   label: "Requests" },
  { id: "favourites", label: "Saved"    },
  { id: "profile",    label: "Profile"  },
];

// ── SkillCard ─────────────────────────────────────────────────────────────────
function SkillCard({ p, onBook, savedIds = [], toggleSave }) {
  const [reported, setReported] = useState(false);
  const isSaved = savedIds.includes(p.id);
  return (
    <div className="card" style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: "0 1px 6px rgba(26,127,114,0.05)", padding: "16px" }}>
      <div style={{ display: "flex", gap: 11, alignItems: "center", marginBottom: 12 }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{ width: 42, height: 42, borderRadius: 9, background: p.available ? C.primaryLight : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, color: p.available ? C.primary : "#94a3b8" }}>{p.avatar}</div>
          {p.verified && <div title="Verified" style={{ position: "absolute", bottom: -3, right: -3, width: 15, height: 15, borderRadius: "50%", background: "#2563eb", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "#fff", fontWeight: 700 }}>✓</div>}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.2 }}>{p.skill}</div>
          <div style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>{p.name} · {p.distance}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: p.available ? "#22c55e" : "#cbd5e1", boxShadow: p.available ? "0 0 0 2px #dcfce7" : "none" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: p.price === "Free" ? "#16a34a" : C.text }}>{p.price}</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: C.textMid }}>★ {p.rating} <span style={{ color: C.textLight }}>({p.reviews})</span></span>
        {p.tag && <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, fontWeight: 600, background: tagStyle[p.tag]?.bg, color: tagStyle[p.tag]?.color, border: `1px solid ${tagStyle[p.tag]?.border}` }}>{p.tag}</span>}
      </div>
      <div style={{ display: "flex", gap: 7 }}>
        <button className="pbtn" onClick={() => p.available && onBook(p)} style={{ flex: 1, padding: "9px", background: p.available ? C.primary : "#e2e8f0", color: p.available ? "#fff" : "#94a3b8", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: p.available ? "pointer" : "default" }}>
          {p.available ? "Send Request" : "Unavailable"}
        </button>
        {toggleSave && (
          <button onClick={() => toggleSave(p.id)} title={isSaved ? "Unsave" : "Save"} style={{ padding: "9px 11px", background: isSaved ? C.primaryLight : C.bg, border: `1px solid ${isSaved ? C.primary : C.border}`, borderRadius: 7, fontSize: 14, cursor: "pointer", color: isSaved ? C.primary : C.textLight, transition: "all .15s" }}>
            {isSaved ? "♥" : "♡"}
          </button>
        )}
        <button onClick={() => setReported(r => !r)} title="Report" style={{ padding: "9px 11px", background: reported ? "#fef2f2" : C.bg, border: `1px solid ${reported ? "#fecaca" : C.border}`, borderRadius: 7, fontSize: 13, cursor: "pointer", color: reported ? "#dc2626" : C.textLight }}>⚑</button>
      </div>
      {reported && <div style={{ marginTop: 8, fontSize: 11, color: "#dc2626", background: "#fef2f2", borderRadius: 6, padding: "6px 9px", border: "1px solid #fecaca" }}>Thanks — we'll review this profile.</div>}
    </div>
  );
}

// ── Explore ───────────────────────────────────────────────────────────────────
function ExploreTab({ onBook, savedIds, toggleSave }) {
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const filtered = skills.filter(s =>
    (cat === "all" || s.category === cat) &&
    (s.skill.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div>
      <div style={{ background: `linear-gradient(150deg, ${C.primaryDark} 0%, ${C.teal} 100%)`, padding: "40px 24px 32px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(22px,5vw,36px)", color: "#fff", letterSpacing: "-0.5px", marginBottom: 8, lineHeight: 1.15 }}>Your neighbourhood's got talent</h1>
        <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 14, fontWeight: 300, maxWidth: 300, margin: "0 auto 24px" }}>Skills, help, and know-how — one block away.</p>
        <div style={{ maxWidth: 400, margin: "0 auto", position: "relative" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search skills or names…" style={{ width: "100%", padding: "11px 14px 11px 38px", borderRadius: 9, border: "none", fontSize: 13, background: "rgba(255,255,255,0.97)", color: C.text, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
          <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: C.textLight, fontSize: 14, pointerEvents: "none" }}>⌕</span>
        </div>
      </div>
      <div style={{ display: "flex", background: C.primary }}>
        {[["1,247", "neighbours"], ["89", "skills"], ["4.2k", "completed"]].map(([v, l], i) => (
          <div key={l} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, color: "#fff" }}>{v}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: 0.5 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, padding: "14px 20px", overflowX: "auto", background: C.surface, borderBottom: `1px solid ${C.border}` }}>
        {categories.map(c => (
          <button key={c.id} className="chip" onClick={() => setCat(c.id)} style={{ padding: "6px 14px", borderRadius: 7, border: `1.5px solid ${cat === c.id ? C.primary : C.border}`, background: cat === c.id ? C.primaryLight : "transparent", color: cat === c.id ? C.primary : C.textMid, fontSize: 12, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", transition: "all .15s" }}>{c.label}</button>
        ))}
      </div>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "20px 18px 80px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(255px, 1fr))", gap: 14 }}>
        {filtered.length === 0 && <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: C.textLight, fontSize: 14 }}>No results for "<strong>{search}</strong>"</div>}
        {filtered.map(p => <SkillCard key={p.id} p={p} onBook={onBook} savedIds={savedIds} toggleSave={toggleSave} />)}
      </div>
    </div>
  );
}

// ── Messages ──────────────────────────────────────────────────────────────────
function MessagesTab() {
  const [active, setActive] = useState(null);
  const [reply, setReply] = useState("");
  const [chats, setChats] = useState({
    1: [{ from: "them", text: "Sure! Saturday morning works great for me.", ts: Date.now() - 120000 }],
    2: [{ from: "them", text: "I can come by Thursday around 4pm if that suits?", ts: Date.now() - 3600000 }],
    3: [{ from: "them", text: "Thanks for the request! What level are you at?", ts: Date.now() - 10800000 }],
    4: [{ from: "them", text: "We meet at the park every Tuesday at 7am 🌿", ts: Date.now() - 86400000 }],
  });
  const [lastTs, setLastTs] = useState({
    1: Date.now() - 120000, 2: Date.now() - 3600000,
    3: Date.now() - 10800000, 4: Date.now() - 86400000,
  });
  const [search, setSearch] = useState("");

  const send = () => {
    if (!reply.trim()) return;
    const now = Date.now();
    setChats(prev => ({ ...prev, [active]: [...(prev[active] || []), { from: "me", text: reply, ts: now }] }));
    setLastTs(prev => ({ ...prev, [active]: now }));
    setReply("");
  };

  const fmt = ts => {
    const d = Date.now() - ts;
    if (d < 60000) return "just now";
    if (d < 3600000) return `${Math.floor(d / 60000)}m ago`;
    if (d < 86400000) return `${Math.floor(d / 3600000)}h ago`;
    return `${Math.floor(d / 86400000)}d ago`;
  };

  const sorted = [...messagesData]
    .sort((a, b) => (lastTs[b.id] || 0) - (lastTs[a.id] || 0))
    .filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.skill.toLowerCase().includes(search.toLowerCase()));

  if (active) {
    const person = messagesData.find(m => m.id === active);
    const chat = chats[active] || [];
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 114px)" }}>
        <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "12px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setActive(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: C.textMid, padding: 0 }}>←</button>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 12, color: C.primary }}>{person.avatar}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{person.name}</div>
            <div style={{ fontSize: 11, color: C.textLight }}>{person.skill}</div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
          {chat.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "72%", padding: "9px 13px", borderRadius: 12, background: m.from === "me" ? C.primary : C.surface, color: m.from === "me" ? "#fff" : C.text, fontSize: 13, lineHeight: 1.5, border: m.from === "me" ? "none" : `1px solid ${C.border}`, borderBottomRightRadius: m.from === "me" ? 3 : 12, borderBottomLeftRadius: m.from === "me" ? 12 : 3 }}>{m.text}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 16px", background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
          <input value={reply} onChange={e => setReply(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message…" style={{ flex: 1, borderRadius: 8, border: `1.5px solid ${C.border}`, padding: "9px 12px", fontSize: 13, color: C.text, background: C.bg }} />
          <button className="pbtn" onClick={send} style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Send</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 18px 80px" }}>
      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 12 }}>Messages</div>
      <div style={{ position: "relative", marginBottom: 14 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conversations…" style={{ width: "100%", padding: "10px 14px 10px 36px", borderRadius: 9, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.text, background: C.surface }} />
        <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: C.textLight, fontSize: 14, pointerEvents: "none" }}>⌕</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sorted.map(m => {
          const chat = chats[m.id] || [];
          const lastMsg = chat[chat.length - 1];
          const preview = lastMsg ? lastMsg.text : m.preview;
          const isMe = lastMsg?.from === "me";
          return (
            <div key={m.id} onClick={() => setActive(m.id)} className="card" style={{ background: C.surface, borderRadius: 11, border: `1px solid ${C.border}`, padding: "14px 16px", cursor: "pointer", display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{ width: 42, height: 42, borderRadius: 9, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, color: C.primary }}>{m.avatar}</div>
                {m.unread && !isMe && <div style={{ position: "absolute", top: -2, right: -2, width: 9, height: 9, background: "#ef4444", borderRadius: "50%", border: "2px solid #fff" }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: m.unread && !isMe ? 600 : 500, color: C.text }}>{m.name}</span>
                  <span style={{ fontSize: 11, color: C.textLight }}>{fmt(lastTs[m.id])}</span>
                </div>
                <div style={{ fontSize: 11, color: C.textLight, marginBottom: 2 }}>{m.skill}</div>
                <div style={{ fontSize: 12, color: C.textMid, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {isMe && <span style={{ color: C.textLight }}>You: </span>}{preview}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Requests ──────────────────────────────────────────────────────────────────
function RequestsTab() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 18px 80px" }}>
      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 16 }}>My Requests</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {requestsData.map(r => {
          const s = statusStyle[r.status];
          return (
            <div key={r.id} className="card" style={{ background: C.surface, borderRadius: 11, border: `1px solid ${C.border}`, padding: "16px" }}>
              <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 12, color: C.primary, flexShrink: 0 }}>{r.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: C.textLight }}>{r.skill}</div>
                    </div>
                    <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, fontWeight: 600, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>{s.label}</span>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, color: C.textMid, background: C.bg, borderRadius: 7, padding: "8px 10px", lineHeight: 1.5 }}>"{r.note}"</div>
                  <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: C.textLight }}>📅 {r.date}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: r.price === "Free" ? "#16a34a" : C.text }}>{r.price}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Saved ─────────────────────────────────────────────────────────────────────
function FavouritesTab({ onBook, savedIds, toggleSave }) {
  const favs = skills.filter(s => savedIds.includes(s.id));
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "20px 18px 80px" }}>
      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 4 }}>Saved</div>
      <div style={{ fontSize: 12, color: C.textLight, marginBottom: 16 }}>{favs.length} skill{favs.length !== 1 ? "s" : ""} saved</div>
      {favs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: C.textLight }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>♡</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: C.textMid, marginBottom: 6 }}>Nothing saved yet</div>
          <div style={{ fontSize: 12 }}>Tap ♡ on any skill to save it here</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(255px, 1fr))", gap: 14 }}>
          {favs.map(p => <SkillCard key={p.id} p={p} onBook={onBook} savedIds={savedIds} toggleSave={toggleSave} />)}
        </div>
      )}
    </div>
  );
}

// ── Profile ───────────────────────────────────────────────────────────────────
function ProfileTab() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: "Alex M.", bio: "Passionate about community. I offer help with gardening and basic carpentry.", skill: "Gardening & Carpentry", price: "Free", location: "Montmartre, Paris" });
  const [draft, setDraft] = useState(profile);

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "20px 18px 80px" }}>

      {/* Profile card */}
      <div style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ background: `linear-gradient(135deg,${C.primaryDark},${C.teal})`, padding: "28px 24px 20px", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 14, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", margin: "0 auto 10px", position: "relative" }}>
            AM
            <div style={{ position: "absolute", bottom: -4, right: -4, width: 20, height: 20, borderRadius: "50%", background: "#2563eb", border: "2px solid rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700 }}>✓</div>
          </div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>{profile.name}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>📍 {profile.location}</div>
        </div>
        <div style={{ padding: "16px 20px" }}>
          {!editing ? (
            <>
              <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, marginBottom: 14 }}>{profile.bio}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: C.bg, borderRadius: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: C.textMid }}>🛠 {profile.skill}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: profile.price === "Free" ? "#16a34a" : C.text }}>{profile.price}</span>
              </div>
              <button className="pbtn" onClick={() => { setDraft(profile); setEditing(true); }} style={{ width: "100%", background: C.primary, color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit Profile</button>
            </>
          ) : (
            <>
              {[{ label: "Name", key: "name" }, { label: "Skill", key: "skill" }, { label: "Rate", key: "price" }, { label: "Location", key: "location" }].map(f => (
                <div key={f.key} style={{ marginBottom: 10 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: C.textMid, marginBottom: 4 }}>{f.label}</label>
                  <input value={draft[f.key]} onChange={e => setDraft(p => ({ ...p, [f.key]: e.target.value }))} style={{ width: "100%", borderRadius: 7, border: `1.5px solid ${C.border}`, padding: "8px 11px", fontSize: 12, color: C.text, background: C.bg }} />
                </div>
              ))}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: C.textMid, marginBottom: 4 }}>Bio</label>
                <textarea value={draft.bio} onChange={e => setDraft(p => ({ ...p, bio: e.target.value }))} rows={3} style={{ width: "100%", borderRadius: 7, border: `1.5px solid ${C.border}`, padding: "8px 11px", fontSize: 12, color: C.text, background: C.bg, resize: "none" }} />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="pbtn" onClick={() => { setProfile(draft); setEditing(false); }} style={{ flex: 1, background: C.primary, color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Save</button>
                <button onClick={() => setEditing(false)} style={{ padding: "10px 16px", background: C.bg, color: C.textMid, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, cursor: "pointer" }}>Cancel</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* My Skills */}
      <div style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, padding: "16px", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: C.text }}>My Skills</div>
            <div style={{ fontSize: 11, color: C.textLight, marginTop: 1 }}>Skills you're offering to neighbours</div>
          </div>
          <button className="pbtn" style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 7, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>+ Add</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { skill: "Gardening & Carpentry", price: "Free",   requests: 3, rating: 4.7, reviews: 14, active: true  },
            { skill: "Basic Home Repairs",     price: "€15/hr", requests: 1, rating: 4.5, reviews: 4,  active: false },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: C.bg, borderRadius: 10, border: `1px solid ${C.border}` }}>
              <div style={{ width: 40, height: 40, borderRadius: 9, background: s.active ? C.primaryLight : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={s.active ? C.primary : "#94a3b8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{s.skill}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: s.price === "Free" ? "#16a34a" : C.text }}>{s.price}</span>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.active ? "#22c55e" : "#cbd5e1", boxShadow: s.active ? "0 0 0 2px #dcfce7" : "none" }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: C.textLight }}>★ {s.rating} ({s.reviews} reviews)</span>
                  <span style={{ fontSize: 11, color: C.textLight }}>· {s.requests} active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          { v: "€1,370", l: "Earned",  sub: "all time"   },
          { v: "77",     l: "Helped",  sub: "neighbours" },
          { v: "14",     l: "Reviews", sub: "avg 4.7★"   },
        ].map(({ v, l, sub }) => (
          <div key={l} style={{ background: C.surface, borderRadius: 10, border: `1px solid ${C.border}`, padding: "13px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: C.primary, lineHeight: 1.1 }}>{v}</div>
            <div style={{ fontSize: 11, color: C.text, fontWeight: 500, marginTop: 3 }}>{l}</div>
            <div style={{ fontSize: 10, color: C.textLight, marginTop: 1 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Reviews */}
      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 2 }}>My Reviews</div>
      <div style={{ fontSize: 12, color: C.textLight, marginBottom: 14 }}>What your neighbours are saying about you</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { id: 1, reviewer: "Priya K.", avatar: "PK", skill: "Gardening",   rating: 5, text: "Alex completely transformed my balcony. Patient, creative, and the results are stunning!", date: "3 days ago"  },
          { id: 2, reviewer: "Noah B.",  avatar: "NB", skill: "Carpentry",   rating: 5, text: "Built a beautiful bookshelf for my living room. Solid craftsmanship and super friendly.",  date: "1 week ago"  },
          { id: 3, reviewer: "Carla M.", avatar: "CM", skill: "Gardening",   rating: 4, text: "Really helpful with my herb garden setup. Gave great tips I didn't find anywhere online.", date: "2 weeks ago" },
          { id: 4, reviewer: "Jamie T.", avatar: "JT", skill: "Home Repairs", rating: 5, text: "Fixed a shelf and patched a wall. Quick, tidy, and didn't charge a cent. Legend.",         date: "3 weeks ago" },
        ].map(r => (
          <div key={r.id} className="card" style={{ background: C.surface, borderRadius: 11, border: `1px solid ${C.border}`, padding: "14px" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 11, color: C.primary, flexShrink: 0 }}>{r.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{r.reviewer}</span>
                    <span style={{ fontSize: 10, color: C.textLight, background: C.bg, borderRadius: 5, padding: "1px 6px", marginLeft: 6 }}>{r.skill}</span>
                  </div>
                  <span style={{ fontSize: 11, color: C.textLight, flexShrink: 0 }}>{r.date}</span>
                </div>
                <div style={{ display: "flex", gap: 2, marginBottom: 5 }}>
                  {[1, 2, 3, 4, 5].map(n => <span key={n} style={{ fontSize: 11, color: n <= r.rating ? "#f59e0b" : "#e2e8f0" }}>★</span>)}
                </div>
                <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.55, margin: 0 }}>"{r.text}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("explore");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", skill: "", price: "", bio: "" });
  const [offered, setOffered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState([2, 3, 5, 7]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(t);
  }, []);

  const toggleSave = id => setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const openBook = p => { setSelected(p); setModal("book"); setMsg(""); setSent(false); };
  const close = () => { setModal(null); setSelected(null); setOffered(false); };

  if (loading) return (
    <div style={{ position: "fixed", inset: 0, background: `linear-gradient(145deg, ${C.primaryDark} 0%, ${C.teal} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@600;700;800&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes popIn { 0%{opacity:0;transform:scale(0.7)} 60%{opacity:1;transform:scale(1.06)} 100%{opacity:1;transform:scale(1)} }
        @keyframes fadeUp { 0%{opacity:0;transform:translateY(12px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
        .logo-mark{animation:popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards}
        .logo-word{animation:fadeUp 0.5s ease 0.5s both}
        .logo-tag{animation:fadeUp 0.5s ease 0.75s both}
        .dot1{animation:pulse 1.1s ease 1.1s infinite}
        .dot2{animation:pulse 1.1s ease 1.3s infinite}
        .dot3{animation:pulse 1.1s ease 1.5s infinite}
      `}</style>
      <div className="logo-mark" style={{ marginBottom: 24 }}>
        <svg viewBox="0 0 120 120" width="96" height="96">
          <defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="rgba(255,255,255,0.25)"/><stop offset="100%" stopColor="rgba(255,255,255,0.08)"/></linearGradient></defs>
          <rect width="120" height="120" rx="30" fill="url(#lg)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
          <text x="60" y="86" fontFamily="Georgia, serif" fontSize="76" fontWeight="700" fill="white" textAnchor="middle">J</text>
          <circle cx="74" cy="22" r="7" fill="white" opacity="0.5"/>
        </svg>
      </div>
      <div className="logo-word"><span style={{ fontFamily: "Georgia, serif", fontSize: 52, fontWeight: 700, color: "#fff", letterSpacing: -1.5 }}>junto</span></div>
      <div className="logo-tag" style={{ marginTop: 10 }}><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.6)", letterSpacing: 3, textTransform: "uppercase" }}>skills next door</span></div>
      <div style={{ display: "flex", gap: 8, marginTop: 48 }}>
        {["dot1", "dot2", "dot3"].map(d => <div key={d} className={d} style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} />)}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@600;700;800&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .card{transition:box-shadow 0.18s,transform 0.18s}
        .card:hover{box-shadow:0 6px 22px rgba(26,127,114,0.13)!important;transform:translateY(-1px)}
        .pbtn:hover{background:${C.primaryDark}!important}
        .chip:hover{background:${C.primary}!important;color:#fff!important;border-color:${C.primary}!important}
        .ov{animation:fade .18s ease}
        .md{animation:up .22s ease}
        @keyframes fade{from{opacity:0}to{opacity:1}}
        @keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        input,textarea{font-family:'DM Sans',sans-serif}
        input:focus,textarea:focus{outline:none;border-color:${C.accent}!important}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-thumb{background:${C.border};border-radius:4px}
      `}</style>

      {/* Nav */}
      <nav style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <svg viewBox="0 0 360 120" height="38">
          <defs><linearGradient id="ng" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1a7f72"/><stop offset="100%" stopColor="#2ab8a6"/></linearGradient></defs>
          <rect x="8" y="8" width="104" height="104" rx="32" fill="url(#ng)"/>
          <text x="60" y="86" fontFamily="Georgia, serif" fontSize="76" fontWeight="700" fill="white" textAnchor="middle">J</text>
          <circle cx="74" cy="22" r="7" fill="#e6f4f2" opacity="0.7"/>
          <text x="138" y="68" fontFamily="Georgia, serif" fontSize="52" fontWeight="700" fill="#0f2e2b" letterSpacing="-1">junto</text>
          <text x="140" y="92" fontFamily="Helvetica Neue, Arial, sans-serif" fontSize="13" fill="#2ab8a6" letterSpacing="2">skills next door ✦</text>
        </svg>
        <button className="pbtn" onClick={() => { setModal("offer"); setOffered(false); setForm({ name: "", skill: "", price: "", bio: "" }); }} style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 7, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Offer Skill</button>
      </nav>

      <div style={{ paddingBottom: 62 }}>
        {tab === "explore"    && <ExploreTab onBook={openBook} savedIds={savedIds} toggleSave={toggleSave} />}
        {tab === "messages"   && <MessagesTab />}
        {tab === "requests"   && <RequestsTab />}
        {tab === "favourites" && <FavouritesTab onBook={openBook} savedIds={savedIds} toggleSave={toggleSave} />}
        {tab === "profile"    && <ProfileTab />}
      </div>

      {/* Bottom bar */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", zIndex: 100, height: 62 }}>
        {navTabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, border: "none", background: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, padding: "5px 0", color: tab === t.id ? C.primary : C.textLight, transition: "color .15s", minWidth: 0 }}>
            <TabIcon id={t.id} active={tab === t.id} />
            <span style={{ fontSize: 10, fontWeight: tab === t.id ? 600 : 400, letterSpacing: 0.2, whiteSpace: "nowrap" }}>{t.label}</span>
            {tab === t.id && <div style={{ width: 16, height: 2, background: C.primary, borderRadius: 2 }} />}
          </button>
        ))}
      </div>

      {/* Book Modal */}
      {modal === "book" && selected && (
        <div className="ov" onClick={close} style={{ position: "fixed", inset: 0, background: "rgba(15,46,43,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="md" onClick={e => e.stopPropagation()} style={{ background: C.surface, borderRadius: 14, maxWidth: 380, width: "100%", boxShadow: "0 20px 56px rgba(0,0,0,0.18)", overflow: "hidden" }}>
            <div style={{ background: `linear-gradient(135deg,${C.primaryDark},${C.teal})`, padding: "18px 22px" }}>
              <div style={{ display: "flex", gap: 11, alignItems: "center" }}>
                <div style={{ width: 42, height: 42, borderRadius: 9, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#fff", fontSize: 15 }}>{selected.avatar}</div>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11 }}>{selected.name} · {selected.distance}</div>
                  <div style={{ color: "#fff", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16 }}>{selected.skill}</div>
                </div>
              </div>
            </div>
            <div style={{ padding: "18px 22px 22px" }}>
              {!sent ? (
                <>
                  <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, marginBottom: 14 }}>{selected.bio}</p>
                  <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder={`Hi ${selected.name.split(" ")[0]}, I'd love your help with…`} rows={3} style={{ width: "100%", borderRadius: 8, border: `1.5px solid ${C.border}`, padding: "9px 11px", fontSize: 12, color: C.text, background: C.bg, resize: "none", marginBottom: 12 }} />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="pbtn" onClick={() => msg.trim() && setSent(true)} style={{ flex: 1, background: msg.trim() ? C.primary : "#e2e8f0", color: msg.trim() ? "#fff" : "#94a3b8", border: "none", borderRadius: 7, padding: "10px", fontSize: 12, fontWeight: 600, cursor: msg.trim() ? "pointer" : "default" }}>Send Request</button>
                    <button onClick={close} style={{ padding: "10px 16px", background: C.bg, color: C.textMid, border: `1px solid ${C.border}`, borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Cancel</button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "14px 0" }}>
                  <div style={{ width: 50, height: 50, background: C.primaryLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 20, color: C.primary }}>✓</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Request sent!</div>
                  <div style={{ fontSize: 12, color: C.textMid, marginBottom: 18 }}>{selected.name.split(" ")[0]} will reply soon.</div>
                  <button className="pbtn" onClick={close} style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 7, padding: "9px 22px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Done</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Offer Modal */}
      {modal === "offer" && (
        <div className="ov" onClick={close} style={{ position: "fixed", inset: 0, background: "rgba(15,46,43,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="md" onClick={e => e.stopPropagation()} style={{ background: C.surface, borderRadius: 14, maxWidth: 380, width: "100%", boxShadow: "0 20px 56px rgba(0,0,0,0.18)", overflow: "hidden" }}>
            <div style={{ background: `linear-gradient(135deg,${C.primaryDark},${C.teal})`, padding: "18px 22px" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>Offer a Skill</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>Join 1,247 members of your Junto</div>
            </div>
            <div style={{ padding: "18px 22px 22px" }}>
              {!offered ? (
                <>
                  {[{ label: "Your name", key: "name", placeholder: "e.g. Sophie L." }, { label: "Your skill", key: "skill", placeholder: "e.g. French Pastry & Baking" }, { label: "Rate (optional)", key: "price", placeholder: "e.g. €20/hr or Free" }].map(f => (
                    <div key={f.key} style={{ marginBottom: 10 }}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: C.textMid, marginBottom: 4 }}>{f.label}</label>
                      <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={{ width: "100%", borderRadius: 7, border: `1.5px solid ${C.border}`, padding: "9px 11px", fontSize: 12, color: C.text, background: C.bg }} />
                    </div>
                  ))}
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: C.textMid, marginBottom: 4 }}>Short bio</label>
                    <textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} placeholder="Tell neighbours about your experience…" rows={3} style={{ width: "100%", borderRadius: 7, border: `1.5px solid ${C.border}`, padding: "9px 11px", fontSize: 12, color: C.text, background: C.bg, resize: "none" }} />
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="pbtn" onClick={() => form.name && form.skill && setOffered(true)} style={{ flex: 1, background: C.primary, color: "#fff", border: "none", borderRadius: 7, padding: "10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>List My Skill</button>
                    <button onClick={close} style={{ padding: "10px 16px", background: C.bg, color: C.textMid, border: `1px solid ${C.border}`, borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Cancel</button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "14px 0" }}>
                  <div style={{ width: 50, height: 50, background: C.primaryLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 20, color: C.primary }}>✓</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 6 }}>You're listed!</div>
                  <div style={{ fontSize: 12, color: C.textMid, marginBottom: 18 }}>Welcome, <strong>{form.name.split(" ")[0]}</strong>. Your skill is now live.</div>
                  <button className="pbtn" onClick={close} style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 7, padding: "9px 22px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Explore Skills</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
