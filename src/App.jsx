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
                {m.unread && !isMe && <div style={{ position: "absolute", top: -2, right: -2, width: 9, height: 9, ba
