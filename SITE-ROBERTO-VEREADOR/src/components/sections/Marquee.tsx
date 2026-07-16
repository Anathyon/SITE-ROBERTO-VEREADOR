import { MARQUEE_ITEMS } from "../../data";

export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div style={{
      width: "100%", background: "var(--navy-deep)",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      padding: "1.5rem 0", overflow: "hidden",
    }}>
      <div className="animate-marquee" style={{ display: "flex", gap: "4rem", whiteSpace: "nowrap" }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "4rem", fontFamily: "var(--font-display)", fontSize: "1.75rem", color: "rgba(255,255,255,0.35)" }}>
            {it}
            <span style={{ color: "var(--gold)" }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
