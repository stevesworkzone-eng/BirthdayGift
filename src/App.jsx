import React, { useEffect, useMemo, useRef, useState } from "react";

// ZERO-DEPENDENCY REACT APP (no Tailwind / motion / icons)
// Save as src/App.jsx and put assets into /public (see CONFIG)

const CONFIG = {
  secretCode: "25062025",
  herName: "Rose",
  yourName: "You know who",
  dateLabel: "20 Sept 2025",
  letterTitle: "A Little Love Letter 💌",
  letterBody:
    "Happy Birthday, my love! On this special day, I just want to remind you how much light you bring into my life. I adore your smile, your kindness, and the way you make ordinary moments feel magical. Here’s a small treasure trail of surprises, made just for you. I hope it makes you smile as much as you make me smile every day.\n\nForever yours,\n",
  // Assets (place in /public)
  bgAudioUrl: "/audio/soothing.mp3", // background loop
  audioUrl: "/audio/happy-birthday.mp3", // dedicated song on the audio step
  photos: [
    "/images/slide1.png",
    "/images/slide2.png",
    "/images/slide3.png",
    "/images/slide4.png",
    "/images/slide5.png",
    "/images/slide6.png",
    "/images/slide7.png",
    "/images/slide8.png",
  ],
};

const styles = {
  page: {
    minHeight: "100vh",
    margin: 0,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
    color: "#111827",
    position: "relative",
    overflowX: "hidden",
  },
  bg: {
    position: "fixed",
    inset: 0,
    // 💜 Violet → Fuchsia → Pink gradient
    background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #fb7185 100%)",
    zIndex: -2,
  },
  vignette: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    background:
      "radial-gradient(1200px 600px at 50% -10%, rgba(255,255,255,.0), rgba(255,255,255,.0) 40%, rgba(0,0,0,.12) 85%)",
    zIndex: -1,
  },
  shell: { maxWidth: 960, margin: "0 auto", padding: "44px 16px 80px" },
  card: {
    background: "rgba(255,255,255,0.82)",
    borderRadius: 22,
    boxShadow: "0 20px 60px rgba(0,0,0,.12)",
    padding: 26,
    backdropFilter: "blur(6px)",
  },
  h1: { fontSize: 38, margin: "0 0 8px", textAlign: "center", letterSpacing: 0.2, color: "#0b1020" },
  h2: { fontSize: 24, margin: "0 0 12px" },
  p: { lineHeight: 1.65, margin: "8px 0" },
  input: {
    width: "100%",
    maxWidth: 380,
    fontSize: 18,
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid #f9a8d4",
    outline: "none",
    textAlign: "center",
  },
  btn: {
    appearance: "none",
    border: 0,
    background: "#db2777",
    color: "white",
    padding: "12px 18px",
    borderRadius: 14,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 12,
    boxShadow: "0 10px 24px rgba(219,39,119,.35)",
  },
  btnGhost: {
    appearance: "none",
    border: "1px solid #fbcfe8",
    background: "white",
    color: "#be185d",
    padding: "10px 16px",
    borderRadius: 12,
    fontWeight: 700,
    cursor: "pointer",
  },
  footer: { textAlign: "center", opacity: 0.85, color: "#0b1020", fontSize: 12, marginTop: 16 },
};

// Floating cute background (cats + flowers + stars)
function FloatingBackground() {
  const emojis = ["💖", "✨", "🐱", "🌼", "🌺", "🌟", "😺", "🐾"]; 
  const items = Array.from({ length: 30 }).map((_, i) => {
    const left = Math.random() * 100;
    const size = 16 + Math.random() * 22;
    const delay = Math.random() * 6;
    const dur = 12 + Math.random() * 10;
    return (
      <span
        key={i}
        className="float-emoji"
        style={{ left: left + "%", fontSize: size, animationDelay: `${delay}s`, animationDuration: `${dur}s` }}
      >
        {emojis[Math.floor(Math.random() * emojis.length)]}
      </span>
    );
  });
  return <div className="float-wrap">{items}</div>;
}

function GiftBox({ open }) {
  return (
    <div className="gift">
      <div className={`lid ${open ? "open" : ""}`} />
      <div className="box" />
      <div className="ribbon" />
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("login"); // login → gift → letter → audio → memories
  const [code, setCode] = useState("");
  const [showLetter, setShowLetter] = useState(false);
  const [muted, setMuted] = useState(false);
  const bgmRef = useRef(null);
  const audioRef = useRef(null);

  const canEnter = useMemo(() => code.trim() === CONFIG.secretCode, [code]);

  // Start background music on first unlock
  const startBgm = async () => {
    if (!bgmRef.current) return;
    try {
      bgmRef.current.muted = muted;
      bgmRef.current.volume = 0.25;
      await bgmRef.current.play();
    } catch {}
  };

  useEffect(() => {
    if (!bgmRef.current) return;
    bgmRef.current.muted = muted;
  }, [muted]);

  return (
    <div style={styles.page}>
      {/* Violet → Fuchsia → Pink gradient + vignette */}
      <div style={styles.bg} />
      <div style={styles.vignette} />

      {/* Floating emojis */}
      <style>{`
        .float-wrap {position:fixed; inset:0; overflow:hidden; pointer-events:none;}
        .float-emoji {position:absolute; bottom:-10%; animation:rise linear infinite; opacity:0;}
        @keyframes rise { 0%{transform:translateY(0); opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(-115vh); opacity:0}}
        .gift {position:relative; width:210px; height:210px; margin:0 auto;}
        .gift .box{position:absolute; inset:0; background:#f472b6; border:6px solid #db2777; border-radius:16px; box-shadow:0 12px 30px rgba(0,0,0,.15)}
        .gift .ribbon{position:absolute; inset:auto 50% 0 50%; transform:translateX(-50%); width:26px; height:100%; background:#db2777; border-radius:12px}
        .gift .lid{position:absolute; left:50%; transform:translateX(-50%); top:-26px; width:160px; height:30px; background:#db2777; border-radius:12px; transition:transform .6s cubic-bezier(.2,.8,.2,1)}
        .gift .lid.open{transform:translateX(-50%) translateY(-20px) rotate(-6deg)}
        .overlay{position:fixed; inset:0; background:rgba(0,0,0,.45); display:grid; place-items:center; padding:16px}
        .modal{background:#fff; max-width:720px; width:100%; border-radius:18px; padding:22px; box-shadow:0 24px 60px rgba(0,0,0,.25)}
        .row{display:flex; align-items:center; justify-content:center; gap:10px; flex-wrap:wrap}
        .center{text-align:center}
        .spacer{height:12px}
        .controls{display:flex; align-items:center; gap:8px}
        .slideshow{position:relative; overflow:hidden; border-radius:18px; box-shadow:0 12px 30px rgba(0,0,0,.15); background:#111}
        .slide{width:100%; height:55vh; object-fit:cover; display:block; opacity:0; transition:opacity .5s ease, transform 5s ease; transform:scale(1.03)}
        .slide.loaded{opacity:1; transform:scale(1)}
        .placeholder{display:grid; place-items:center; width:100%; height:55vh; color:#eee;}
        .navbtn{position:absolute; top:50%; transform:translateY(-50%); background:rgba(255,255,255,.85); border:0; border-radius:999px; padding:8px 12px; cursor:pointer; font-weight:700}
        .navbtn.left{left:10px} .navbtn.right{right:10px}
        .dots{position:absolute; bottom:10px; left:0; right:0; display:flex; gap:6px; justify-content:center}
        .dot{width:8px; height:8px; border-radius:999px; background:rgba(255,255,255,.6)}
        .dot.active{background:#fff}
        .topbar{display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:16px}
        .mutebtn{background:#111827; color:#fff; border:0; border-radius:10px; padding:8px 12px; cursor:pointer}
      `}</style>

      <FloatingBackground />

      {/* Background audio loop (starts on unlock) */}
      <audio ref={bgmRef} src={CONFIG.bgAudioUrl} loop preload="auto" />

      <div style={styles.shell}>
        <div className="topbar">
          <div>
            <h1 style={styles.h1}>Happy Birthday, {CONFIG.herName}!</h1>
            <div className="center" style={{ opacity: 0.85, color: "#0b1020" }}>A tiny website with big love · {CONFIG.dateLabel}</div>
          </div>
          <div className="controls">
            <button className="mutebtn" onClick={() => setMuted((m) => !m)}>{muted ? "Unmute" : "Mute"}</button>
          </div>
        </div>

        {step === "login" && (
          <div style={styles.card} className="center">
            <h2 style={styles.h2}>Enter the Secret Code</h2>
            <div style={{ opacity: 0.8, marginBottom: 8 }}>Psst… check your messages 😉</div>
            <input
              style={styles.input}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === "Enter" && canEnter) { await startBgm(); setStep("gift"); }
              }}
              placeholder="Enter secret code"
            />
            <div className="spacer" />
            <button
              style={styles.btn}
              disabled={!canEnter}
              onClick={async () => { await startBgm(); setStep("gift"); }}
            >
              Unlock Surprise
            </button>
            {!canEnter && code && (
              <div style={{ color: "#ffe4e6", background:"#9f1239", padding:"6px 10px", borderRadius:10, display:"inline-block", marginTop: 10 }}>Hmm… not quite. Try again! 🗝️</div>
            )}
          </div>
        )}

        {step === "gift" && (
          <div style={styles.card} className="center">
            <div style={{ opacity: 0.9, marginBottom: 10 }}>   </div>
            <div onClick={() => setShowLetter(true)} style={{ cursor: "pointer" }}>
              <GiftBox open={showLetter} />
            </div>
            <button style={styles.btn} onClick={() => setShowLetter(true)}>Open Letter</button>

            {showLetter && (
              <div className="overlay" onClick={() => setShowLetter(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <h2 style={styles.h2}>{CONFIG.letterTitle}</h2>
                  {CONFIG.letterBody.split("\n\n").map((t, i) => (
                    <p key={i} style={styles.p}>{t}</p>
                  ))}
                  <p className="center" style={{ fontWeight: 700, marginTop: 10 }}>— {CONFIG.yourName}</p>
                  <div className="row" style={{ justifyContent: "flex-end", marginTop: 12 }}>
                    <button style={styles.btnGhost} onClick={() => setShowLetter(false)}>Close</button>
                    <button style={{ ...styles.btn, marginLeft: 8 }} onClick={() => { setShowLetter(false); setStep("audio"); }}>Next Surprise</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === "letter" && (
          <div style={styles.card}>
            <h2 style={styles.h2}>{CONFIG.letterTitle}</h2>
            {CONFIG.letterBody.split("\n\n").map((t, i) => (
              <p key={i} style={{ ...styles.p, fontSize: 18 }}>{t}</p>
            ))}
            <p style={{ textAlign: "right", fontWeight: 700, marginTop: 16 }}>— {CONFIG.yourName}</p>
            <div className="row" style={{ justifyContent: "flex-end", marginTop: 10 }}>
              <button style={{ ...styles.btn }} onClick={() => setStep("audio")}>Next Surprise</button>
            </div>
          </div>
        )}

        {step === "audio" && (
          <div style={styles.card} className="center">
            <h2 style={styles.h2}>A Song for You</h2>
            <div style={{ opacity: 0.85, marginBottom: 8 }}>Hit play and let the moment sink in 🎵</div>
            <audio ref={audioRef} src={CONFIG.audioUrl} controls style={{ width: "100%" }} />
            <div className="spacer" />
            <button style={styles.btn} onClick={() => setStep("memories")}>Memory Lane</button>
          </div>
        )}

        {step === "memories" && <MemoryLane photos={CONFIG.photos} onRestart={() => setStep("gift")} />}

        <div style={styles.footer}>Made with ❤️ by {CONFIG.yourName} · {CONFIG.dateLabel}</div>
      </div>
    </div>
  );
}

function MemoryLane({ photos, onRestart }) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(Array(photos.length).fill(false));
  const [errored, setErrored] = useState(Array(photos.length).fill(false));
  const timer = useRef(null);

  useEffect(() => {
    if (!photos || photos.length <= 1) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % photos.length), 3000);
    return () => clearInterval(timer.current);
  }, [photos]);

  const go = (dir) => setIndex((i) => (i + dir + photos.length) % photos.length);

  const markLoaded = (i) => setLoaded((arr) => { const c = arr.slice(); c[i] = true; return c; });
  const markError = (i) => setErrored((arr) => { const c = arr.slice(); c[i] = true; return c; });

  return (
    <div style={styles.card}>
      <div className="topbar" style={{ marginBottom: 10 }}>
        <h2 style={styles.h2}>Memory Lane</h2>
        <div style={{ opacity: 0.85, color: "#0b1020" }}>Swipe / Click arrows</div>
      </div>
      <div className="slideshow">
        {!loaded[index] && !errored[index] && <div className="placeholder">Loading…</div>}
        {errored[index] ? (
          <div className="placeholder" style={{ color: "#fca5a5" }}>Image not found</div>
        ) : (
          <img
            className={`slide ${loaded[index] ? "loaded" : ""}`}
            src={photos[index]}
            alt={`Memory ${index + 1}`}
            onLoad={() => markLoaded(index)}
            onError={() => markError(index)}
          />
        )}
        <button className="navbtn left" onClick={() => go(-1)}>◀</button>
        <button className="navbtn right" onClick={() => go(1)}>▶</button>
        <div className="dots">
          {photos.map((_, i) => (
            <span key={i} className={`dot ${i === index ? "active" : ""}`} />
          ))}
        </div>
      </div>
      <div className="center" style={{ marginTop: 14 }}>
        <button style={styles.btnGhost} onClick={onRestart}>Restart Surprises</button>
      </div>
    </div>
  );
}
