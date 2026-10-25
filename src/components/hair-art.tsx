// Sample artwork drawn in SVG, so the shop looks complete before real product photos exist.
// Replace with <Image> photos from /public when they arrive.

type Texture = "Straight" | "Body wave" | "Deep wave" | "Kinky curly";
export type ArtKind = "wig" | "bob" | "bundles" | "closure" | "bottle" | "jar" | "dropper" | "spray" | "bonnet" | "kit" | "salon" | "portrait";

// Small seeded random so every render draws the same picture.
function rng(seed: number) {
  let s = seed % 2147483647 || 1;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
const hash = (str: string) => [...str].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7) >>> 0;

const HAIR = ["#1b120f", "#2a1b15", "#3a261c"];
const SKIN = "#7b4a32";

// One strand from (x, y) falling `len` pixels, shaped by texture.
function strand(x: number, y: number, len: number, texture: Texture, r: () => number) {
  const amp = texture === "Straight" ? 2 + r() * 2 : texture === "Body wave" ? 10 + r() * 4 : 6 + r() * 3;
  const period = texture === "Straight" ? 160 : texture === "Body wave" ? 70 + r() * 10 : 28 + r() * 6;
  const phase = r() * Math.PI * 2;
  let d = `M${x.toFixed(1)} ${y.toFixed(1)}`;
  for (let t = 6; t <= len; t += 6) {
    const dx = Math.sin(t / period * Math.PI * 2 + phase) * amp * Math.min(1, t / 40);
    d += ` L${(x + dx).toFixed(1)} ${(y + t).toFixed(1)}`;
  }
  return d;
}

function Strands({ cx, top, width, len, texture, seed, count = 70 }: { cx: number; top: number; width: number; len: number; texture: Texture; seed: number; count?: number }) {
  const r = rng(seed);
  return (
    <g fill="none" strokeLinecap="round">
      {Array.from({ length: count }, (_, i) => {
        const x = cx - width / 2 + (width * i) / (count - 1) + (r() - 0.5) * 4;
        const l = len * (0.86 + r() * 0.14);
        return <path key={i} d={strand(x, top, l, texture, r)} stroke={HAIR[i % 3]} strokeWidth={2.2 + r() * 1.6} opacity={0.9} />;
      })}
      {Array.from({ length: Math.round(count / 4) }, (_, i) => {
        const x = cx - width / 2 + r() * width;
        return <path key={`h${i}`} d={strand(x, top + 10, len * 0.7, texture, r)} stroke="#6b4a36" strokeWidth={1} opacity={0.35} />;
      })}
    </g>
  );
}

function Curls({ cx, cy, rx, ry, seed }: { cx: number; cy: number; rx: number; ry: number; seed: number }) {
  const r = rng(seed);
  return (
    <g fill="none" strokeLinecap="round">
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={HAIR[0]} />
      {Array.from({ length: 260 }, (_, i) => {
        const a = r() * Math.PI * 2, d = Math.sqrt(r());
        const x = cx + Math.cos(a) * rx * d, y = cy + Math.sin(a) * ry * d;
        const s = 5 + r() * 6;
        return <circle key={i} cx={x} cy={y} r={s} stroke={i % 5 ? HAIR[i % 3] : "#5a3c2c"} strokeWidth={1.8} strokeDasharray={`${s * 4} ${s * 2}`} />;
      })}
    </g>
  );
}

function Mannequin() {
  return (
    <g>
      <path d="M120 500 C130 430 160 410 200 405 C240 410 270 430 280 500 Z" fill={SKIN} opacity="0.9" />
      <rect x="182" y="300" width="36" height="110" rx="14" fill={SKIN} />
      <ellipse cx="200" cy="235" rx="62" ry="80" fill={SKIN} />
      <ellipse cx="200" cy="250" rx="50" ry="62" fill="#8a5439" opacity="0.5" />
    </g>
  );
}

function Wig({ texture, len, seed }: { texture: Texture; len: number; seed: number }) {
  if (texture === "Kinky curly") {
    return (
      <>
        <Curls cx={200} cy={250} rx={140} ry={95 + len * 0.6} seed={seed} />
        <Mannequin />
        <path d="M138 215 C140 150 260 150 262 215 C240 180 160 180 138 215 Z" fill={HAIR[1]} />
        <Curls cx={200} cy={170} rx={95} ry={60} seed={seed + 1} />
      </>
    );
  }
  return (
    <>
      <Strands cx={200} top={175} width={190} len={len} texture={texture} seed={seed} count={80} />
      <Mannequin />
      <path d="M134 240 C122 125 278 125 266 240 C258 195 236 170 200 166 C164 170 142 195 134 240 Z" fill={HAIR[0]} />
      <Strands cx={146} top={185} width={46} len={len * 0.92} texture={texture} seed={seed + 3} count={18} />
      <Strands cx={254} top={185} width={46} len={len * 0.92} texture={texture} seed={seed + 5} count={18} />
      <path d="M200 160 C175 165 150 185 140 215 M200 160 C225 165 250 185 260 215" fill="none" stroke="#5a3c2c" strokeOpacity="0.5" strokeWidth="2" />
    </>
  );
}

function Bundles({ texture, seed }: { texture: Texture; seed: number }) {
  return (
    <>
      <rect x="70" y="60" width="260" height="8" rx="4" fill="#b9a58a" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Strands cx={120 + i * 80} top={72} width={60} len={300 + i * 40} texture={texture} seed={seed + i} count={34} />
          <rect x={90 + i * 80} y="64" width="60" height="12" rx="3" fill="#2a1b15" />
          <rect x={102 + i * 80} y="80" width="36" height="16" fill="#f4ede3" />
          <text x={120 + i * 80} y="92" textAnchor="middle" fontSize="10" fill="#1a1412" fontFamily="sans-serif">{`${14 + i * 2}"`}</text>
        </g>
      ))}
    </>
  );
}

function Closure({ texture, seed }: { texture: Texture; seed: number }) {
  return (
    <>
      <Strands cx={200} top={150} width={170} len={300} texture={texture} seed={seed} count={70} />
      <path d="M110 120 L290 120 L300 200 L100 200 Z" fill="#d9b59a" opacity="0.85" />
      <path d="M110 120 L290 120 L300 200 L100 200 Z" fill="url(#lace)" />
      <line x1="200" y1="125" x2="200" y2="198" stroke="#7b4a32" strokeWidth="2" strokeDasharray="3 3" />
    </>
  );
}

function Bottle({ label, color, kind }: { label: string; color: string; kind: "bottle" | "jar" | "dropper" | "spray" }) {
  const lbl = (y: number, w: number) => (
    <>
      <rect x={200 - w / 2} y={y} width={w} height="110" fill="#fbf7f1" />
      <text x="200" y={y + 38} textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fill="#1a1412">LAVISH</text>
      <line x1={200 - w / 3} y1={y + 50} x2={200 + w / 3} y2={y + 50} stroke={color} strokeWidth="2" />
      <text x="200" y={y + 72} textAnchor="middle" fontFamily="sans-serif" fontSize="11" letterSpacing="2" fill="#6f645b">{label.toUpperCase()}</text>
    </>
  );
  if (kind === "jar")
    return (
      <g>
        <ellipse cx="200" cy="430" rx="150" ry="16" fill="#000" opacity="0.08" />
        <rect x="95" y="190" width="210" height="60" rx="10" fill="#1a1412" />
        <rect x="85" y="245" width="230" height="185" rx="24" fill={color} />
        {lbl(280, 170)}
      </g>
    );
  if (kind === "dropper")
    return (
      <g>
        <ellipse cx="200" cy="440" rx="110" ry="14" fill="#000" opacity="0.08" />
        <rect x="178" y="80" width="44" height="70" rx="20" fill="#1a1412" />
        <rect x="170" y="145" width="60" height="40" rx="6" fill="#b08d57" />
        <rect x="120" y="180" width="160" height="260" rx="30" fill={color} opacity="0.9" />
        {lbl(250, 130)}
      </g>
    );
  return (
    <g>
      <ellipse cx="200" cy="455" rx="110" ry="14" fill="#000" opacity="0.08" />
      {kind === "spray" ? (
        <>
          <rect x="175" y="70" width="70" height="30" rx="6" fill="#1a1412" />
          <rect x="230" y="78" width="40" height="12" rx="4" fill="#1a1412" />
          <rect x="185" y="100" width="30" height="40" fill="#1a1412" />
        </>
      ) : (
        <rect x="170" y="80" width="60" height="60" rx="8" fill="#1a1412" />
      )}
      <path d="M150 140 L250 140 C275 150 285 170 285 200 L285 430 C285 445 275 455 260 455 L140 455 C125 455 115 445 115 430 L115 200 C115 170 125 150 150 140 Z" fill={color} />
      <path d="M135 190 L135 420" stroke="#fff" strokeOpacity="0.35" strokeWidth="10" strokeLinecap="round" />
      {lbl(250, 150)}
    </g>
  );
}

function Bonnet({ color }: { color: string }) {
  return (
    <g>
      <ellipse cx="200" cy="400" rx="160" ry="20" fill="#000" opacity="0.08" />
      <path d="M60 320 C60 150 340 150 340 320 Z" fill={color} />
      <path d="M90 230 C150 190 250 190 310 230" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="14" />
      <rect x="55" y="310" width="290" height="44" rx="22" fill={color} />
      <rect x="55" y="310" width="290" height="44" rx="22" fill="#000" opacity="0.18" />
    </g>
  );
}

function Kit() {
  return (
    <g>
      <rect x="80" y="110" width="40" height="300" rx="8" fill="#1a1412" />
      {Array.from({ length: 22 }, (_, i) => <rect key={i} x="120" y={120 + i * 13} width="40" height="5" rx="2" fill="#1a1412" />)}
      <rect x="200" y="100" width="34" height="220" rx="16" fill="#b08d57" />
      <rect x="196" y="320" width="42" height="90" rx="10" fill="#d8c7ab" />
      {Array.from({ length: 9 }, (_, i) => <line key={i} x1={200 + i * 4} y1="320" x2={200 + i * 4} y2="300" stroke="#1a1412" strokeWidth="2" />)}
      <ellipse cx="310" cy="250" rx="45" ry="58" fill="#efe6d8" stroke="#cbbba3" strokeWidth="3" />
      <rect x="280" y="300" width="60" height="110" rx="10" fill="#efe6d8" stroke="#cbbba3" strokeWidth="3" />
    </g>
  );
}

function Salon({ seed }: { seed: number }) {
  return (
    <g>
      <rect x="0" y="330" width="400" height="170" fill="#000" opacity="0.12" />
      <rect x="60" y="60" width="150" height="220" rx="75" fill="#f6efe5" opacity="0.6" stroke="#d9c5a5" strokeWidth="6" />
      <rect x="230" y="60" width="150" height="220" rx="75" fill="#f6efe5" opacity="0.6" stroke="#d9c5a5" strokeWidth="6" />
      <g transform="translate(-20 60) scale(0.6)"><Wig texture="Body wave" len={260} seed={seed} /></g>
      <g transform="translate(160 60) scale(0.6)"><Wig texture="Straight" len={300} seed={seed + 9} /></g>
      <rect x="40" y="330" width="320" height="16" rx="8" fill="#b08d57" />
    </g>
  );
}

export function HairArt({
  kind, texture = "Straight", inches = 18, tone, label = "", seed = "", className = "",
}: {
  kind: ArtKind; texture?: Texture; inches?: number; tone: string; label?: string; seed?: string; className?: string;
}) {
  const s = hash(seed || kind + texture + tone);
  const len = 120 + inches * 9;
  return (
    <svg viewBox="0 0 400 500" className={className} role="img" aria-label={label || `${texture} ${kind}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`bg${s}`} cx="0.5" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#fbf6ef" />
          <stop offset="1" stopColor={tone} stopOpacity="0.55" />
        </radialGradient>
        <pattern id="lace" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 0 L6 6 M6 0 L0 6" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="400" height="500" fill={`url(#bg${s})`} />
      {kind === "wig" && <Wig texture={texture} len={len} seed={s} />}
      {kind === "bob" && <Wig texture="Straight" len={150} seed={s} />}
      {kind === "bundles" && <Bundles texture={texture} seed={s} />}
      {kind === "closure" && <Closure texture={texture} seed={s} />}
      {(kind === "bottle" || kind === "jar" || kind === "dropper" || kind === "spray") && <Bottle kind={kind} label={label} color={tone} />}
      {kind === "bonnet" && <Bonnet color={tone} />}
      {kind === "kit" && <Kit />}
      {kind === "salon" && <Salon seed={s} />}
      {kind === "portrait" && <Wig texture={texture} len={len} seed={s} />}
    </svg>
  );
}
