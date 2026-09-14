"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { company } from "../lib/company";

/* ─── tiny hook: count up a number on mount ─── */
function useCountUp(target, duration = 1400, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return value;
}

/* ─── intersection-observer hook ─── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ════════════════════════════════════════════
   ANIMATED BACKGROUND — particle + gradient
═══════════════════════════════════════════ */
function ParticleBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const DOTS = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.5 + 0.1,
    }));
    

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      DOTS.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${d.o})`;
        ctx.fill();
      });
      /* connections */
      for (let i = 0; i < DOTS.length; i++) {
        for (let j = i + 1; j < DOTS.length; j++) {
          const dx = DOTS[i].x - DOTS[j].x, dy = DOTS[i].y - DOTS[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(DOTS[i].x, DOTS[i].y);
            ctx.lineTo(DOTS[j].x, DOTS[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${0.07 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

/* ════════════════════════════════════════════
   CURSOR GLOW
═══════════════════════════════════════════ */
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const move = (e) => {
      if (el) { el.style.left = e.clientX + "px"; el.style.top = e.clientY + "px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div ref={ref} style={{
      position: "fixed", pointerEvents: "none", zIndex: 9999,
      width: 380, height: 380, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
      transform: "translate(-50%, -50%)",
      transition: "left 0.12s ease, top 0.12s ease",
    }} />
  );
}

/* ════════════════════════════════════════════
   GLASS CARD helper
═══════════════════════════════════════════ */
function Glass({ children, style = {}, className = "", hover = true, ...rest }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: hov
          ? "rgba(255,255,255,0.09)"
          : "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        border: hov
          ? "1px solid rgba(201,168,76,0.35)"
          : "1px solid rgba(255,255,255,0.10)",
        borderRadius: 20,
        transition: "all 0.3s ease",
        boxShadow: hov
          ? "0 8px 40px rgba(201,168,76,0.12), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════
   FLOATING ORBIT VISUAL
═══════════════════════════════════════════ */
function OrbitVisual() {
  return (
    <div style={{ position: "relative", width: 480, height: 480, flexShrink: 0 }}>
      {/* rings */}
      {[180, 290, 420].map((size, i) => (
        <div key={i} style={{
          position: "absolute",
          width: size, height: size,
          borderRadius: "50%",
          border: `1px solid rgba(255,255,255,${0.04 + i * 0.02})`,
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          animation: `spinRing ${18 + i * 8}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
        }} />
      ))}

      {/* orbit dots */}
      {[
        { icon: "🗳️", size: 290, dur: 7, delay: 0, color: "rgba(201,168,76,0.25)" },
        { icon: "🔐", size: 180, dur: 5, delay: -2, color: "rgba(99,130,255,0.25)" },
        { icon: "✅", size: 420, dur: 11, delay: -4, color: "rgba(34,197,94,0.2)" },
        { icon: "📊", size: 420, dur: 14, delay: -7, color: "rgba(251,146,60,0.2)" },
      ].map((o, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: o.size, height: o.size,
          marginTop: -o.size / 2, marginLeft: -o.size / 2,
          animation: `orbit ${o.dur}s linear infinite`,
          animationDelay: `${o.delay}s`,
        }}>
          <div style={{
            position: "absolute", top: 0, left: "50%",
            transform: "translateX(-50%)",
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(6,13,31,0.8)",
            border: `1px solid ${o.color}`,
            backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14,
            boxShadow: `0 0 16px ${o.color}`,
          }}>
            {o.icon}
          </div>
        </div>
      ))}

      {/* center glass card */}
      <Glass style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 160, height: 160,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        animation: "floatY 5s ease-in-out infinite",
        borderRadius: 24,
      }} hover={false}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: "linear-gradient(135deg,#C9A84C,#F0C847)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, fontWeight: 800, color: "#060D1F",
          marginBottom: 10,
          boxShadow: "0 4px 24px rgba(240,200,71,0.4)",
        }}>E</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>Electra</div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>by Marvlosphere</div>
        <div style={{
          display: "flex", alignItems: "center", gap: 5, marginTop: 10,
          background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)",
          borderRadius: 8, padding: "3px 8px", fontSize: 9, color: "#4ade80",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", animation: "pulse 1.2s ease-in-out infinite", display: "inline-block" }} />
          Live
        </div>
      </Glass>

      {/* floating stat cards */}
      <Glass style={{
        position: "absolute", bottom: 40, left: -20,
        padding: "12px 16px", borderRadius: 14,
        animation: "floatY 6s ease-in-out infinite",
        animationDelay: "-2s",
        minWidth: 120,
      }} hover={false}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Votes cast</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#F0C847", letterSpacing: -1 }}>1,247</div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>Real-time</div>
      </Glass>

      <Glass style={{
        position: "absolute", top: 50, right: -30,
        padding: "12px 16px", borderRadius: 14,
        animation: "floatY 7s ease-in-out infinite",
        animationDelay: "-4s",
        minWidth: 130,
      }} hover={false}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Integrity score</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#4ade80", letterSpacing: -1 }}>100%</div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>SHA-256 verified</div>
      </Glass>
    </div>
  );
}

/* ════════════════════════════════════════════
   VOTE BAR animated
═══════════════════════════════════════════ */
function VoteBar({ pct, color, name, initials, bg }) {
  const [w, setW] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => { if (inView) setTimeout(() => setW(pct), 200); }, [inView, pct]);
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 150 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: bg, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 10, fontWeight: 700, color,
          flexShrink: 0,
        }}>{initials}</div>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{name}</span>
      </div>
      <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${w}%`, borderRadius: 3,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          transition: "width 1s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: `0 0 8px ${color}55`,
        }} />
      </div>
      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", minWidth: 32, textAlign: "right" }}>{pct}%</span>
    </div>
  );
}

/* ════════════════════════════════════════════
   STEP CARD
═══════════════════════════════════════════ */
function StepCard({ num, icon, title, body, color, delay = 0 }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
      background: hov ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: hov ? `1px solid ${color}55` : "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20, padding: "32px 28px", position: "relative", overflow: "hidden",
      cursor: "default",
      boxShadow: hov ? `0 8px 40px ${color}18, inset 0 1px 0 rgba(255,255,255,0.07)` : "inset 0 1px 0 rgba(255,255,255,0.04)",
      transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease, all 0.3s ease`,
    }}>
      {/* shimmer on hover */}
      {hov && (
        <div style={{
          position: "absolute", top: 0, left: "-60%", width: "50%", height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
          animation: "shimmerPass 0.8s ease forwards",
          pointerEvents: "none",
        }} />
      )}
      <div style={{ fontSize: 52, fontWeight: 800, color: "rgba(255,255,255,0.04)", lineHeight: 1, marginBottom: 20 }}>{num}</div>
      <div style={{
        width: 46, height: 46, borderRadius: 13,
        background: `${color}18`, border: `1px solid ${color}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, marginBottom: 16,
        boxShadow: `0 0 20px ${color}20`,
      }}>{icon}</div>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>{body}</div>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function HomePage() {
  const uniCount = useCountUp(3, 1200, 700);
  const integrityCount = useCountUp(100, 1400, 900);
  const electionsCount = useCountUp(12, 1600, 1100);

  const [heroRef, heroIn] = useInView({ threshold: 0 });
  const [aboutRef, aboutIn] = useInView();
  const [ctaRef, ctaIn] = useInView();

  return (
    <>
      {/* ── GLOBAL STYLES ──
          dangerouslySetInnerHTML (not JSX children) is required here:
          React HTML-escapes text-node children when rendering server-side
          ('  -> &#x27;, & -> &amp;), but browsers parse <style> as raw text
          with no entity decoding — so a plain <style>{`...`}</style> sends
          broken, entity-encoded CSS on first paint (breaking this exact
          @import) and then fails hydration on every load, forcing React
          to discard and rebuild the whole page. dangerouslySetInnerHTML
          sets the same raw string on both server and client, avoiding the
          mismatch entirely. Safe here since the content is fully static,
          developer-authored CSS with no user input. */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'Inter', system-ui, sans-serif;
          background: #060D1F;
          color: #fff;
          overflow-x: hidden;
        }

        @keyframes orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spinRing {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes pulse {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.2); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes shimmerPass {
          from { left: -60%; }
          to   { left: 160%; }
        }
        @keyframes gradientShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes rotateHalo {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes barIn {
          from { width: 0; }
        }
        @keyframes blobMove {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(30px,-20px) scale(1.05); }
          66%      { transform: translate(-20px,15px) scale(0.97); }
        }

        .hero-title-word {
          display: inline-block;
          animation: fadeUp 0.6s ease both;
        }
        .hero-title-word:nth-child(1) { animation-delay: 0.15s; }
        .hero-title-word:nth-child(2) { animation-delay: 0.25s; }
        .hero-title-word:nth-child(3) { animation-delay: 0.35s; }
        .hero-title-word:nth-child(4) { animation-delay: 0.45s; }
        .hero-title-word:nth-child(5) { animation-delay: 0.55s; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }

        /* Responsive fixes — this page previously had no mobile handling
           at all: fixed-width elements and un-collapsing grids caused
           horizontal overflow (measured 549px content in a 375px
           viewport) and unreadably squeezed columns on phones. */
        @media (max-width: 900px) {
          .hero-orbit-wrap { display: none; }
          .grid-3, .grid-4, .grid-2, .grid-2-main, .grid-2-auto {
            grid-template-columns: 1fr !important;
          }
        }
      ` }} />

      <CursorGlow />

      <div style={{ background: "#060D1F", minHeight: "100vh" }}>

        {/* ══ HERO ══ */}
        {/* Site-wide nav/CTA live in the shared <Header> from layout.js — this
            page used to render its own on top of it, which caused two
            overlapping, unclickable navbars. Top padding is reduced from the
            original 100px since the real Header now occupies flow space
            above this section instead of floating over it. */}
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "48px 40px 80px", overflow: "hidden" }}>
          {/* animated blobs */}
          {[
            { w: 700, h: 700, bg: "radial-gradient(circle,rgba(201,168,76,0.1) 0%,transparent 70%)", r: "-150px", t: "-150px", dur: 18 },
            { w: 500, h: 500, bg: "radial-gradient(circle,rgba(99,130,255,0.08) 0%,transparent 70%)", l: "-50px", b: "0", dur: 22 },
            { w: 400, h: 400, bg: "radial-gradient(circle,rgba(34,197,94,0.06) 0%,transparent 70%)", r: "20%", b: "10%", dur: 25 },
          ].map((b, i) => (
            <div key={i} style={{
              position: "absolute", width: b.w, height: b.h, borderRadius: "50%",
              background: b.bg,
              right: b.r, top: b.t, left: b.l, bottom: b.b,
              animation: `blobMove ${b.dur}s ease-in-out infinite`,
              animationDelay: `${-i * 5}s`,
              pointerEvents: "none",
            }} />
          ))}

          {/* grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
            pointerEvents: "none",
          }} />

          <ParticleBg />

          {/* rotating halo behind visual */}
          <div style={{
            position: "absolute", right: "5%", top: "50%",
            width: 520, height: 520,
            background: "conic-gradient(from 0deg, transparent 0%, rgba(201,168,76,0.04) 25%, transparent 50%, rgba(99,130,255,0.04) 75%, transparent 100%)",
            borderRadius: "50%",
            animation: "rotateHalo 20s linear infinite",
            pointerEvents: "none",
          }} />

          {/* content */}
          <div style={{ position: "relative", zIndex: 2, flex: 1, maxWidth: 600 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1px solid rgba(201,168,76,0.3)", borderRadius: 20,
              padding: "5px 14px", fontSize: 12, color: "#C9A84C",
              marginBottom: 28, background: "rgba(201,168,76,0.06)",
              backdropFilter: "blur(10px)",
              animation: "fadeUp 0.6s 0.05s ease both",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A84C", animation: "pulse 1.5s ease-in-out infinite", display: "inline-block" }} />
              Nigerian Software Company · CAC BN: {company.cac}
            </div>

            <h1 style={{ fontSize: "clamp(40px,5.5vw,64px)", fontWeight: 900, lineHeight: 1.06, letterSpacing: -2, marginBottom: 0 }}>
              {"Digital infrastructure for".split(" ").map((w, i) => (
                <span key={i} className="hero-title-word">{w} </span>
              ))}
              {" "}
              <span style={{
                display: "inline-block",
                background: "linear-gradient(135deg,#C9A84C,#F0C847,#C9A84C)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradientShift 4s ease infinite, fadeUp 0.6s 0.45s ease both",
              }}>African</span>{" "}
              <span className="hero-title-word" style={{ animationDelay: "0.5s" }}>institutions.</span>
            </h1>

            <p style={{
              fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.75,
              marginTop: 22, maxWidth: 480,
              animation: "fadeUp 0.6s 0.55s ease both",
            }}>
              Marvlosphere Technologies builds secure, transparent, and reliable platforms — rooted in Nigeria, built for institutions across Africa.
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 36, animation: "fadeUp 0.6s 0.65s ease both" }}>
              <Link href="/products" style={{
                background: "linear-gradient(135deg,#C9A84C,#F0C847)",
                color: "#060D1F", fontWeight: 700, fontSize: 15,
                padding: "14px 28px", borderRadius: 13, border: "none", cursor: "pointer",
                boxShadow: "0 4px 24px rgba(240,200,71,0.35)",
                transition: "transform 0.15s, box-shadow 0.15s",
                textDecoration: "none", display: "inline-block",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 36px rgba(240,200,71,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 24px rgba(240,200,71,0.35)"; }}
              >
                Explore our products
              </Link>
              <Link href="/about" style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
                color: "#fff", fontWeight: 600, fontSize: 15,
                padding: "14px 26px", borderRadius: 13,
                border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer",
                transition: "all 0.2s ease",
                textDecoration: "none", display: "inline-block",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.11)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
              >
                About us →
              </Link>
            </div>

            {/* STATS */}
            <div style={{ display: "flex", gap: 40, marginTop: 56, animation: "fadeUp 0.6s 0.75s ease both" }}>
              {[
                { num: uniCount + "+", label: "Universities served" },
                { num: integrityCount + "%", label: "Vote integrity" },
                { num: electionsCount + "+", label: "Elections run" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#F0C847", letterSpacing: -1 }}>{num}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: 0.8, marginTop: 3 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ORBIT VISUAL — hidden below 900px; its fixed 480px width plus
              negatively-offset floating cards caused horizontal overflow
              on mobile (measured: 549px content in a 375px viewport). */}
          <div className="hero-orbit-wrap" style={{ position: "relative", zIndex: 2, animation: "scaleIn 0.8s 0.3s ease both" }}>
            <OrbitVisual />
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section style={{ padding: "96px 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#C9A84C", marginBottom: 12 }}>How it works</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.15 }}>
              Three steps to a tamper-proof election
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginTop: 14, maxWidth: 460, margin: "14px auto 0" }}>
              From voter registration to certified results, every step is cryptographically secured.
            </p>
          </div>

          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            <StepCard num="01" icon="🗂️" title="Register voters" color="#C9A84C" delay={0}
              body="Upload the voter roll. Each eligible student gets a single-use token delivered via WhatsApp — no login, no password." />
            <StepCard num="02" icon="🗳️" title="Cast ballots securely" color="#818cf8" delay={0.1}
              body="Voters authenticate with their token. Votes are atomically recorded, structurally separated from identities — secrecy by design." />
            <StepCard num="03" icon="📊" title="Verify results live" color="#4ade80" delay={0.2}
              body="The live dashboard shows real-time counts. PDF results carry a SHA-256 hash anyone can verify — proof tallies were never altered." />
          </div>
        </section>

        {/* ══ PRODUCT SHOWCASE ══ */}
        <section style={{ padding: "0 40px 96px" }}>
          <div style={{ marginBottom: 52 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#C9A84C", marginBottom: 12 }}>Our product</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, letterSpacing: -1 }}>Electra — verifiable elections at any scale</h2>
          </div>

          <div className="grid-2-main" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20 }}>
            {/* MAIN PRODUCT CARD */}
            <Glass style={{ overflow: "hidden", padding: 0 }} hover={false}>
              <div style={{ padding: "32px 32px 0" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: 8, padding: "4px 12px", fontSize: 11, color: "#C9A84C", fontWeight: 600,
                  marginBottom: 18,
                }}>
                  🗳️ Next-Generation Election Platform
                </div>
                <h3 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.8 }}>Electra</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginTop: 10, maxWidth: 380 }}>
                  The successor to FUTABallot — verifiable, large-scale elections for any institution, with token-auth voting, live integrity dashboards, and a tamper-proof audit trail.
                </p>
                <div style={{ display: "flex", gap: 14, marginTop: 20, flexWrap: "wrap" }}>
                  {["Live voting", "Unlimited elections", "2FA admin"].map((t) => (
                    <span key={t} style={{
                      fontSize: 11, color: "#4ade80", display: "flex", alignItems: "center", gap: 5,
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* browser mock */}
              <div style={{ marginTop: 28, background: "rgba(0,0,0,0.25)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                    <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
                  ))}
                  <div style={{
                    flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 6,
                    padding: "4px 12px", fontSize: 10, color: "rgba(255,255,255,0.3)", marginLeft: 8,
                  }}>
                    electra-roan.vercel.app
                  </div>
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>
                    President — Live count (demo data)
                  </div>
                  <VoteBar pct={62} color="#60a5fa" name="Adewale Osei" initials="AO" bg="#1e3a5f" />
                  <VoteBar pct={28} color="#4ade80" name="Ngozi Kalu" initials="NK" bg="#1e3a1e" />
                  <VoteBar pct={10} color="#f87171" name="Emeka Madu" initials="EM" bg="#3a1e1e" />
                </div>
                <div style={{
                  display: "flex", justifyContent: "space-around",
                  background: "rgba(34,197,94,0.05)", borderTop: "1px solid rgba(34,197,94,0.1)",
                  padding: "14px 16px",
                }}>
                  {[
                    { val: "1,247", lab: "Votes cast", color: "#F0C847" },
                    { val: "100%", lab: "Integrity", color: "#4ade80" },
                    { val: "SHA-256", lab: "Hash verified", color: "#60a5fa" },
                    { val: "0", lab: "Anomalies", color: "#4ade80" },
                  ].map(({ val, lab, color }) => (
                    <div key={lab} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color }}>{val}</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{lab}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Glass>

            {/* SIDE CARDS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "🔐", color: "#818cf8", title: "Ballot secrecy by architecture", body: "Votes and voter identities live in structurally unlinked tables. There's no join that maps who voted for whom — secrecy is structural, not just policy." },
                { icon: "⚡", color: "#facc15", title: "Atomic race-condition protection", body: "A PostgreSQL UPDATE WHERE has_voted = false guarantees no voter can cast twice — even under simultaneous requests." },
                { icon: "📲", color: "#4ade80", title: "WhatsApp token delivery", body: "Single-use tokens delivered via WhatsApp Business API — no app install, no email. Maximum reach on Nigerian campuses." },
              ].map(({ icon, color, title, body }) => (
                <Glass key={title} style={{ padding: "22px 24px", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 11, flexShrink: 0,
                      background: `${color}15`, border: `1px solid ${color}28`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, boxShadow: `0 0 16px ${color}18`,
                    }}>{icon}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{title}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{body}</div>
                    </div>
                  </div>
                </Glass>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MARQUEE ══ */}
        {/* Placed after the product deep-dive (not right after the hero) so
            these feature chips have context by the time a visitor sees
            them — a bare jargon ticker before "How it works" meant
            nothing on first load. The old "Why institutions trust us"
            stat grid was cut from here: it repeated the same claims
            (SHA-256, Atomic, CAC) already made one screen up in the
            product side-cards. */}
        <div style={{
          overflow: "hidden", padding: "14px 0",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(10px)",
          whiteSpace: "nowrap",
        }}>
          <div style={{ display: "inline-block", animation: "marqueeScroll 24s linear infinite" }}>
            {[
              "Secure token auth", "Real-time results dashboard",
              "CAC Registered · BN: 9652069", "SHA-256 ballot integrity",
              "WhatsApp OTP delivery", "Rate-limited & tamper-proof",
              "Multi-tenant SaaS", "Atomic vote writes",
              "Secure token auth", "Real-time results dashboard",
              "CAC Registered · BN: 9652069", "SHA-256 ballot integrity",
              "WhatsApp OTP delivery", "Rate-limited & tamper-proof",
              "Multi-tenant SaaS", "Atomic vote writes",
            ].map((item, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginRight: 48, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#C9A84C", display: "inline-block" }} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ══ ABOUT ══ */}
        <section ref={aboutRef} style={{ padding: "0 40px 96px" }}>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            {/* visual */}
            <div style={{
              opacity: aboutIn ? 1 : 0,
              transform: aboutIn ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.7s ease",
            }}>
              <Glass style={{ padding: 32, position: "relative", overflow: "hidden" }} hover={false}>
                {/* animated concentric rings */}
                <div style={{ position: "relative", height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {[220, 160, 100].map((s, i) => (
                    <div key={i} style={{
                      position: "absolute",
                      width: s, height: s, borderRadius: "50%",
                      border: `1px solid rgba(201,168,76,${0.08 + i * 0.07})`,
                      animation: `spinRing ${20 + i * 5}s linear infinite ${i % 2 ? "reverse" : ""}`,
                    }} />
                  ))}
                  {/* center */}
                  <div style={{
                    width: 64, height: 64, borderRadius: 18, zIndex: 2,
                    background: "linear-gradient(135deg,#C9A84C,#F0C847)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, fontWeight: 900, color: "#060D1F",
                    boxShadow: "0 0 40px rgba(240,200,71,0.5)",
                  }}>M</div>
                  {/* Lagos pin */}
                  <div style={{
                    position: "absolute", bottom: "22%", left: "42%",
                    zIndex: 3,
                  }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F0C847", boxShadow: "0 0 0 0 rgba(240,200,71,0.4)", animation: "pulse 2s ease-in-out infinite" }} />
                  </div>
                </div>
                {/* stat strip */}
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  {[
                    { val: "Akure", lab: "HQ, Nigeria" },
                    { val: "2025", lab: "Founded" },
                    { val: "4", lab: "Live platforms" },
                  ].map(({ val, lab }) => (
                    <div key={val} style={{
                      flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12, padding: "12px 14px",
                    }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#F0C847" }}>{val}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{lab}</div>
                    </div>
                  ))}
                </div>
              </Glass>
            </div>

            {/* copy */}
            <div style={{
              opacity: aboutIn ? 1 : 0,
              transform: aboutIn ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.7s 0.15s ease",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: "#C9A84C", marginBottom: 14 }}>About us</div>
              <h2 style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.2 }}>
                Software rooted in Nigeria,<br />built for Africa.
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.48)", lineHeight: 1.85, marginTop: 18 }}>
                We design and operate digital platforms that African institutions can trust — with security, transparency, and reliability at the core of everything we build.
              </p>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.48)", lineHeight: 1.85, marginTop: 14 }}>
                From student elections to student housing and everyday team communication, every product we ship is engineered for the real constraints and real stakes of the African institutional context.
              </p>

              <Glass style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "10px 16px", borderRadius: 12, marginTop: 26, fontSize: 13,
                color: "rgba(255,255,255,0.6)",
              }} hover={false}>
                🏛️ CAC Registered — BN: {company.cac}
              </Glass>

              <div style={{ display: "flex", gap: 20, marginTop: 28 }}>
                {[["Read our story →", "#C9A84C", "/about"], ["Trust & security →", "rgba(255,255,255,0.35)", "/about#registration"]].map(([label, color, href]) => (
                  <a key={label} href={href} style={{
                    fontSize: 14, color, fontWeight: 600, textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 5,
                    transition: "gap 0.2s",
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.gap = "9px"}
                    onMouseLeave={(e) => e.currentTarget.style.gap = "5px"}
                  >{label}</a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section ref={ctaRef} style={{ padding: "0 40px 96px" }}>
          <div className="grid-2-auto" style={{
            position: "relative", overflow: "hidden",
            background: "linear-gradient(120deg,#0D1B3E 0%,#111D3A 50%,#0a1525 100%)",
            border: "1px solid rgba(201,168,76,0.22)",
            borderRadius: 28, padding: "64px 60px",
            display: "grid", gridTemplateColumns: "1fr auto", gap: 56,
            alignItems: "center",
            opacity: ctaIn ? 1 : 0,
            transform: ctaIn ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}>
            {/* glass shimmer overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(201,168,76,0.03) 100%)",
              pointerEvents: "none",
            }} />
            {/* glow */}
            <div style={{
              position: "absolute", width: 450, height: 450, borderRadius: "50%",
              background: "radial-gradient(circle,rgba(201,168,76,0.08) 0%,transparent 70%)",
              right: -100, top: -100, pointerEvents: "none",
              animation: "blobMove 15s ease-in-out infinite",
            }} />

            <div style={{ position: "relative" }}>
              <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.2 }}>
                Ready to bring{" "}
                <span style={{
                  background: "linear-gradient(135deg,#C9A84C,#F0C847)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>secure digital elections</span>
                {" "}to your institution?
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.42)", marginTop: 14 }}>
                Reach out and we'll help you get set up — fast.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
                <a href={`mailto:${company.email}`} style={{
                  background: "linear-gradient(135deg,#C9A84C,#F0C847)",
                  color: "#060D1F", fontWeight: 700, fontSize: 15,
                  padding: "14px 28px", borderRadius: 13, textDecoration: "none",
                  display: "inline-block",
                  boxShadow: "0 4px 24px rgba(240,200,71,0.35)",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 36px rgba(240,200,71,0.5)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 24px rgba(240,200,71,0.35)"; }}
                >
                  Contact us today
                </a>
                <a href={company.productUrl} target="_blank" rel="noopener noreferrer" style={{
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(16px)",
                  color: "#fff", fontWeight: 600, fontSize: 15,
                  padding: "14px 24px", borderRadius: 13, textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.12)", display: "inline-block",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                >
                  Visit Electra ↗
                </a>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
              {[
                { icon: "✉", label: company.email, href: `mailto:${company.email}` },
                { icon: "☎", label: company.phone, href: `tel:${company.phoneHref}` },
                { icon: "🌐", label: "electra-roan.vercel.app", href: company.productUrl },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  fontSize: 14, color: "rgba(255,255,255,0.55)",
                  textDecoration: "none", transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#F0C847"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
                >
                  <span style={{ fontSize: 18, color: "#C9A84C" }}>{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Site-wide footer lives in the shared <Footer> from layout.js —
            this page used to render its own duplicate footer here, with
            different (fake) contact details than the real one. */}

      </div>
    </>
  );
}
