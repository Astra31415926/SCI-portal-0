/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Terminal, 
  Layers, 
  SlidersHorizontal, 
  QrCode, 
  Check, 
  Copy, 
  Send, 
  Eye, 
  ExternalLink, 
  Mail, 
  Phone, 
  ShieldAlert, 
  ShieldCheck, 
  RotateCcw, 
  Info,
  Laptop,
  Lightbulb,
  Cpu,
  BookOpen,
  ArrowRight,
  Maximize2,
  X
} from "lucide-react";

// --- Types ---
interface ImageDescriptor {
  src: string;
  alt: string;
  category: "blueprint" | "crosstalk" | "steganography";
  titleUa: string;
  titleEn: string;
  descriptionUa: string;
  descriptionEn: string;
  svgFallbackType: "blueprint-rss" | "crosstalk-graph" | "blueprint-scaling" | "qr-emissive" | "qr-steganography" | "qr-synthesis" | "qr-mandala" | "canvas-steget";
}

// --- Image Assets Array with Fallbacks ---
const SCI_IMAGE_ASSETS: ImageDescriptor[] = [
  {
    src: "main_sci_rss_blueprint.png",
    alt: "Геометрична модель RSS (Reflective Spectral Stabilization) із нанесеними математичними операторами нормування каналів",
    category: "blueprint",
    titleUa: "Геометрична модель RSS (Reflective Spectral Stabilization)",
    titleEn: "Reflective Spectral Stabilization (RSS) Geometric Blueprint",
    descriptionUa: "Трьохвимірні вектори спектральних констант із нанесеними математичними операторами нормування каналів.",
    descriptionEn: "Three-dimensional vectors showing spectral targets with applied linear channel normalization operators.",
    svgFallbackType: "blueprint-rss"
  },
  {
    src: "spectral_channels_crosstalk_comparison.png",
    alt: "Стиснення та відновлення колірних каналів: (А) цифровий RGB-оригінал, (В) викривлення через міжканальну інтерференцію при друці, (С) математична стабілізація та ізоляція каналів за моделлю SCI",
    category: "crosstalk",
    titleUa: "Стиснення та відновлення колірних каналів (Порівняння)",
    titleEn: "Spectral Channels Crosstalk Compression & Isolation",
    descriptionUa: "(А) цифровий RGB-оригінал, (В) викривлення через міжканальну інтерференцію при друці, (С) математична стабілізація.",
    descriptionEn: "(A) pristine digital RGB, (B) subtractive distortion caused by channel crosstalk, (C) stabilized restoration output via SCI.",
    svgFallbackType: "crosstalk-graph"
  },
  {
    src: "sci_spectral_scaling_blueprint.png",
    alt: "Математична схема спектрального масштабування за моделлю SCI (базова інженерна інфографіка проекту)",
    category: "blueprint",
    titleUa: "Схема масштабування за моделлю SCI",
    titleEn: "SCI Spectral Scaling Blueprint",
    descriptionUa: "Базова інженерна інфографіка проекту, яка демонструє алгоритмічне обмеження «плато» сильних колірних каналів.",
    descriptionEn: "Core engineering flowchart showing systemic suppression limits to generate an equalized spectral plateau.",
    svgFallbackType: "blueprint-scaling"
  },
  {
    src: "adaptive_emissive_rgb_qrcode.jpg",
    alt: "Еталонна матриця багатошарового коду в адаптивному екранному режимі (випромінювальне RGB-простір)",
    category: "steganography",
    titleUa: "Еталонна матриця багатошарового коду",
    titleEn: "Reference High-Density Emissive QR Matrix",
    descriptionUa: "Багатоканальний матричний паттерн в адаптивному екранному режимі (екологічне випромінювальне RGB-простір зчитування).",
    descriptionEn: "Multi-channel matrix pattern calibrated for emissive RGB displays with zero channel bleeding.",
    svgFallbackType: "qr-emissive"
  },
  {
    src: "steganography_rgb_qrcode.jpg",
    alt: "Схема багатошарового оптичного кодування: компіляція трьох незалежних цифрових каналів в єдиний колірний масив",
    category: "steganography",
    titleUa: "Схема багатошарового оптичного кодування",
    titleEn: "Multi-layered Optical Steganography Scheme",
    descriptionUa: "Компіляція трьох незалежних цифрових інформаційних каналів усередині єдиного колірного контейнера без ризику змішування.",
    descriptionEn: "Synthesized payload combining Red, Green, and Blue sub-matrices into a single printable chromatism schema.",
    svgFallbackType: "qr-steganography"
  },
  {
    src: "ornament_qrcode_synthesis.png",
    alt: "Схема математичного синтезу традиційного геометричного патерну та матриці QR-коду",
    category: "steganography",
    titleUa: "Схема математичного синтезу патерну",
    titleEn: "Geometric Pattern & QR Synthesis Algorithm",
    descriptionUa: "Процес суміщення традиційного орнаменту та корисної кодуючої матриці, захищеного від спотворень друку.",
    descriptionEn: "Mathematical fusion of a traditional geometric pattern with pixelated payload bits resistant to analog noise.",
    svgFallbackType: "qr-synthesis"
  },
  {
    src: "ornamental_rgb_mandala.png",
    alt: "Приклад художньої генерації орнаментального QR-коду (QR.G.B.-ART) на основі симетрії мандали",
    category: "steganography",
    titleUa: "Художня генерація QR.G.B.-ART",
    titleEn: "Ornamental QR.G.B.-ART Mandala Generation",
    descriptionUa: "Приклад художньої генерації орнаментального QR-коду на основі симетричної структури мандали.",
    descriptionEn: "Artistic mandala structure housing functional steganographic elements decoded cleanly under SCI calibration.",
    svgFallbackType: "qr-mandala"
  },
  {
    src: "steganography_acrylic_canvas.jpg",
    alt: "Фізичне втілення моделі SCI: багатошаровий колірний код, нанесений акриловими фарбами на художнє полотно",
    category: "steganography",
    titleUa: "Фізичне втілення на полотні (Акрил)",
    titleEn: "Physical Acrylic Canvas Steganography",
    descriptionUa: "Багатошаровий колірний код ручної роботи на художньому полотні, зчитаний машинним зором завдяки закритим константам моделі.",
    descriptionEn: "Hand-painted acrylic canvas hosting distinct metadata read flawlessly by a computer vision scanner.",
    svgFallbackType: "canvas-steget"
  }
];

// --- Vector Schematics Fallbacks (Component) ---
function VectorFallback({ type, alt }: { type: string; alt: string }) {
  const gridLineColor = "stroke-slate-800/60";
  const cyanAccent = "#00f2fe";
  const greenAccent = "#10b981";
  const magentaAccent = "#ec4899";
  const yellowAccent = "#eab308";

  switch (type) {
    case "blueprint-rss":
      return (
        <svg viewBox="0 0 400 300" className="w-full h-full bg-[#151921] rounded-lg border border-slate-800/80 p-2" aria-label={alt}>
          {/* Scientific coordinate Grid */}
          <g className="opacity-40">
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 30} x2="400" y2={i * 30} className={gridLineColor} strokeDasharray="2,2" />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="300" className={gridLineColor} strokeDasharray="2,2" />
            ))}
          </g>
          {/* Main 3D Axes */}
          <line x1="200" y1="260" x2="200" y2="40" stroke="#475569" strokeWidth="1.5" /> {/* Y */}
          <line x1="200" y1="260" x2="360" y2="260" stroke="#475569" strokeWidth="1.5" /> {/* X */}
          <line x1="200" y1="260" x2="80" y2="180" stroke="#475569" strokeWidth="1.5" /> {/* Z */}
          {/* Vectors representing RGB/CMYK discrepancies */}
          <path d="M 200 260 L 320 120" stroke={cyanAccent} strokeWidth="2.5" strokeDasharray="none" markerEnd="url(#arrow)" />
          <path d="M 200 260 L 130 140" stroke={magentaAccent} strokeWidth="2" strokeDasharray="2,2" />
          <path d="M 200 260 L 260 90" stroke={greenAccent} strokeWidth="2.5" />
          {/* Stabilized Reflective Limit Circle (RSS Boundary) */}
          <ellipse cx="200" cy="180" rx="90" ry="40" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4,4" />
          <text x="210" y="195" fill="#2563eb" className="text-[10px] font-mono font-medium">Reflective Stabilization Boundary (RSS)</text>
          {/* Mathematical Equations annotation */}
          <rect x="15" y="15" width="135" height="42" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" className="opacity-95" />
          <text x="25" y="30" fill="#fff" className="text-[9px] font-mono">OPERATOR: L_rss &bull; [C]</text>
          <text x="25" y="45" fill={cyanAccent} className="text-[9px] font-mono">R_stabilized = const</text>
          {/* Title label */}
          <text x="15" y="285" fill="#94a3b8" className="text-[10px] font-mono uppercase tracking-wider">Fig 1: Dynamic RSS Vector Field</text>
        </svg>
      );

    case "crosstalk-graph":
      return (
        <svg viewBox="0 0 400 300" className="w-full h-full bg-[#151921] rounded-lg border border-slate-800/80 p-2" aria-label={alt}>
          {/* Plot background grid */}
          <g className="opacity-30">
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`lh-${i}`} x1="40" y1={40 + i * 35} x2="370" y2={40 + i * 35} className={gridLineColor} />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`lv-${i}`} x1={40 + i * 45} y1="40" x2={40 + i * 45} y2="250" className={gridLineColor} />
            ))}
          </g>
          {/* Axis labels */}
          <text x="200" y="280" fill="#94a3b8" className="text-[9px] font-mono text-center" textAnchor="middle">Wavelength (nm) / Спектральний канал (&lambda;)</text>
          <text x="15" y="150" fill="#94a3b8" className="text-[9px] font-mono transform -rotate-90 origin-center text-center" textAnchor="middle">Absorbance (A)</text>
          {/* Curve A: Original Channel */}
          <path d="M 40 240 Q 120 40 200 240" fill="none" stroke="#2563eb" strokeWidth="2" />
          <text x="100" y="100" fill="#2563eb" className="text-[8px] font-mono">Original (A)</text>
          {/* Curve B: Crosstalk Bleed Overlap (Parasitic interference) */}
          <path d="M 40 240 Q 160 50 280 240" fill="none" stroke={magentaAccent} strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M 160 240 Q 240 60 320 240" fill="none" stroke={cyanAccent} strokeWidth="1.5" strokeDasharray="3,3" strokeOpacity="0.8" />
          {/* Overlap Shaded Area indicating Noise */}
          <path d="M 120 240 Q 180 120 240 240 Z" fill={magentaAccent} fillOpacity="0.15" />
          <text x="180" y="130" fill={magentaAccent} className="text-[9px] font-mono font-semibold animate-pulse">Crosstalk Zone (B)</text>
          {/* Curve C: SCI Isolated Stabilization */}
          <path d="M 40 240 L 110 240 Q 200 130 290 240 M 110 135 H 290" fill="none" stroke={cyanAccent} strokeWidth="2.5" />
          <text x="230" y="80" fill={cyanAccent} className="text-[9px] font-mono font-bold">SCI Plat_Stabilized (C)</text>
          {/* Highlight markers */}
          <circle cx="200" cy="135" r="4" fill="#000" stroke={cyanAccent} strokeWidth="1.5" />
          <text x="15" y="25" fill="#94a3b8" className="text-[10px] font-mono uppercase tracking-wider">Fig 2: Wavelength Overlap & SCI Equalization</text>
        </svg>
      );

    case "blueprint-scaling":
      return (
        <svg viewBox="0 0 400 300" className="w-full h-full bg-[#151921] rounded-lg border border-slate-800/80 p-2" aria-label={alt}>
          {/* Process flow arrows and steps */}
          <g transform="translate(10, 10)">
            {/* Step 1: Input Raw Data */}
            <rect x="20" y="40" width="100" height="50" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
            <text x="70" y="65" fill="#fff" className="text-[10px] font-semibold font-sans" textAnchor="middle">RGB Input</text>
            <text x="70" y="78" fill={cyanAccent} className="text-[8px] font-mono" textAnchor="middle">High Entropy Matrix</text>

            <line x1="120" y1="65" x2="160" y2="65" stroke={cyanAccent} strokeWidth="1.5" markerEnd="url(#arrow)" />

            {/* Step 2: Algorithmic Limiter (The Core SCI Plateau constraint) */}
            <rect x="160" y="30" width="110" height="70" rx="8" fill="#0f172a" stroke={cyanAccent} strokeWidth="2" />
            <text x="215" y="50" fill={cyanAccent} className="text-[10px] font-mono font-bold" textAnchor="middle">SCI LIMITING</text>
            <text x="215" y="65" fill="#e2e8f0" className="text-[9px] font-mono" textAnchor="middle">Suppresses brights</text>
            <text x="215" y="78" fill="#e2e8f0" className="text-[9px] font-mono" textAnchor="middle">To weakest overlap</text>
            <text x="215" y="90" fill={greenAccent} className="text-[8px] font-mono font-semibold" textAnchor="middle">Entropy&rarr;0.0%</text>

            <line x1="270" y1="65" x2="310" y2="65" stroke={greenAccent} strokeWidth="1.5" />

            {/* Step 3: Stabilized Medium Output */}
            <rect x="310" y="40" width="60" height="50" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
            <text x="340" y="65" fill="#fff" className="text-[9px] font-bold" textAnchor="middle">RSS Flat</text>
            <text x="340" y="78" fill="#94a3b8" className="text-[8px] font-mono" textAnchor="middle">Print Target</text>

            {/* Visual plot representing the Level Shift */}
            <g transform="translate(40, 140)">
              <text x="0" y="15" fill="#94a3b8" className="text-[9px] font-mono uppercase">Luminosity Levels Adaptation</text>
              {/* Unregulated level bars */}
              <rect x="20" y="30" width="20" height="80" fill={yellowAccent} fillOpacity="0.8" />
              <text x="30" y="25" fill={yellowAccent} className="text-[8px] font-mono text-center" textAnchor="middle">Yellow</text>
              
              <rect x="60" y="30" width="20" height="60" fill={greenAccent} fillOpacity="0.8" />
              <text x="70" y="25" fill={greenAccent} className="text-[8px] font-mono text-center" textAnchor="middle">Green</text>

              <rect x="100" y="30" width="20" height="35" fill="#818cf8" fillOpacity="0.8" />
              <text x="110" y="25" fill="#818cf8" className="text-[8px] font-mono text-center" textAnchor="middle">Violet</text>

              {/* Arrow showing downward suppression limit */}
              <path d="M 30 35 L 30 85" stroke="red" strokeWidth="1.5" strokeDasharray="3,3" />
              <path d="M 70 35 L 70 65" stroke="red" strokeWidth="1.5" strokeDasharray="3,3" />

              {/* Stabilizer Line marking limit */}
              <line x1="10" y1="85" x2="140" y2="85" stroke={cyanAccent} strokeWidth="2.5" />
              <text x="150" y="88" fill={cyanAccent} className="text-[8px] font-mono font-bold">SCI Plateau Constant</text>
            </g>
          </g>
          <text x="15" y="285" fill="#94a3b8" className="text-[10px] font-mono uppercase tracking-wider">Fig 3: Processing Pipeline & Constraint Plat</text>
        </svg>
      );

    case "qr-emissive":
    case "qr-steganography":
    case "qr-synthesis":
    case "qr-mandala":
    case "canvas-steget":
      return (
        <svg viewBox="0 0 300 300" className="w-full h-full bg-[#11141a] rounded-lg p-2 border border-slate-800/80" aria-label={alt}>
          {/* Micro QR grid patterns overlay */}
          <g className="opacity-15">
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={`x-${i}`} x1="0" y1={i * 20} x2="300" y2={i * 20} stroke="#00f2fe" strokeWidth="1" />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={`y-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="300" stroke="#00f2fe" strokeWidth="1" />
            ))}
          </g>
          {/* QR Code Anchor Box Shapes */}
          <rect x="25" y="25" width="60" height="60" fill="none" stroke={cyanAccent} strokeWidth="4" rx="4" />
          <rect x="37" y="37" width="36" height="36" fill="none" stroke={cyanAccent} strokeWidth="2" rx="2" />
          <rect x="47" y="47" width="16" height="16" fill={cyanAccent} rx="1" />

          <rect x="215" y="25" width="60" height="60" fill="none" stroke={magentaAccent} strokeWidth="4" rx="4" />
          <rect x="227" y="37" width="36" height="36" fill="none" stroke={magentaAccent} strokeWidth="2" rx="2" />
          <rect x="237" y="47" width="16" height="16" fill={magentaAccent} rx="1" />

          <rect x="25" y="215" width="60" height="60" fill="none" stroke="#2563eb" strokeWidth="4" rx="4" />
          <rect x="37" y="227" width="36" height="36" fill="none" stroke="#2563eb" strokeWidth="2" rx="2" />
          <rect x="47" y="237" width="16" height="16" fill="#2563eb" rx="1" />

          {/* Core matrix specific elements relative to type */}
          {type === "qr-emissive" && (
            <g>
              <circle cx="150" cy="150" r="45" fill="none" stroke={cyanAccent} strokeWidth="2" strokeDasharray="4,4" />
              <path d="M 120 150 Q 150 110 180 150 T 240 150" fill="none" stroke={greenAccent} strokeWidth="1.5" />
              <text x="150" y="154" fill={cyanAccent} className="text-[8px] font-mono text-center" textAnchor="middle">RGB GLOW MODE</text>
            </g>
          )}

          {type === "qr-steganography" && (
            <g>
              {/* Separate RGB payload boxes representing 3 isolated layers */}
              <g opacity="0.8">
                <rect x="110" y="110" width="80" height="80" rx="4" fill="none" stroke={cyanAccent} strokeWidth="1.5" />
                <rect x="115" y="115" width="70" height="70" rx="4" fill="none" stroke={magentaAccent} strokeWidth="1.5" />
                <rect x="120" y="120" width="60" height="60" rx="4" fill="none" stroke="#eab308" strokeWidth="1.5" />
              </g>
              <line x1="150" y1="100" x2="150" y2="200" stroke="#fff" strokeWidth="1" strokeDasharray="2,2" />
              <text x="150" y="154" fill="#fff" className="text-[7px] font-mono font-bold bg-slate-950 px-1 text-center" textAnchor="middle">TRIPLE LAYER CONTAINER</text>
            </g>
          )}

          {type === "qr-synthesis" && (
            <g>
              {/* Ornamental crossbars and geometric intersections */}
              <path d="M 50 150 L 250 150 M 150 50 L 150 250" stroke="#475569" strokeWidth="1.5" />
              <polygon points="150,110 190,150 150,190 110,150" fill="none" stroke={cyanAccent} strokeWidth="2" />
              <polygon points="150,125 175,150 150,175 125,150" fill="none" stroke={magentaAccent} strokeWidth="1" />
              <text x="150" y="278" fill="#94a3b8" className="text-[7px] font-mono text-center" textAnchor="middle">Synthesis Constant &Lambda;_c</text>
            </g>
          )}

          {type === "qr-mandala" && (
            <g transform="translate(150, 150)">
              {Array.from({ length: 8 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 45})`}>
                  <ellipse cx="0" cy="30" rx="12" ry="25" fill="none" stroke={cyanAccent} strokeWidth="1" />
                  <circle cx="0" cy="55" r="3" fill={magentaAccent} />
                </g>
              ))}
              <circle cx="0" cy="0" r="15" fill="#1e222b" stroke="#fff" strokeWidth="1.5" />
              <text x="0" y="3" fill="#fff" className="text-[6px] font-mono font-bold text-center" textAnchor="middle">RSS</text>
            </g>
          )}

          {type === "canvas-steget" && (
            <g>
              <rect x="100" y="100" width="100" height="100" fill="none" stroke="#cbd5e1" strokeWidth="3" />
              {/* Organic handdrawn acrylic brush effect lines */}
              <path d="M 90 95 C 120 100, 180 90, 210 95" stroke={cyanAccent} strokeWidth="4" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
              <path d="M 95 150 C 130 160, 170 145, 205 155" stroke={magentaAccent} strokeWidth="5" strokeLinecap="round" strokeOpacity="0.5" fill="none" />
              <path d="M 120 205 C 140 195, 180 210, 200 200" stroke={yellowAccent} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" fill="none" />
              <text x="150" y="152" fill="#fff" className="text-[9px] font-mono font-bold shadow-md bg-slate-950 rounded px-1 text-center" textAnchor="middle">PHYSICAL CANVAS MODEL</text>
            </g>
          )}

          {/* Random scatter noise-bits representing secure encoded payload pixels */}
          <g fill={cyanAccent} opacity="0.8">
            <rect x="110" y="40" width="8" height="8" />
            <rect x="130" y="55" width="8" height="8" />
            <rect x="150" y="35" width="8" height="8" />
            <rect x="180" y="60" width="8" height="8" style={{ fill: magentaAccent }} />
            <rect x="115" y="210" width="8" height="8" style={{ fill: yellowAccent }} />
            <rect x="145" y="240" width="8" height="8" />
            <rect x="190" y="235" width="8" height="8" style={{ fill: magentaAccent }} />
            <rect x="250" y="120" width="8" height="8" />
            <rect x="235" y="145" width="8" height="8" style={{ fill: yellowAccent }} />
            <rect x="260" y="170" width="8" height="8" style={{ fill: cyanAccent }} />
          </g>

          <text x="15" y="290" fill="#94a3b8" className="text-[8px] font-mono uppercase tracking-widest">{type.replace("-", " ")} payload</text>
        </svg>
      );

    default:
      return null;
  }
}

// --- Image Loading with Fallback Container ---
function SafeLoadImage({ item, onZoom }: { item: ImageDescriptor; onZoom: (i: ImageDescriptor) => void }) {
  const [loadError, setLoadError] = useState(false);

  return (
    <div className="relative group overflow-hidden rounded-xl border border-slate-800/80 bg-[#151921] flex flex-col justify-between transition-all hover:border-[#00f2fe]/40 hover:shadow-[0_0_20px_rgba(0,242,254,0.15)] duration-300">
      <div className="relative w-full aspect-[4/3] bg-slate-950 overflow-hidden">
        {!loadError ? (
          <img 
            src={item.src} 
            alt={item.alt}
            onError={() => setLoadError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full p-1">
            <VectorFallback type={item.svgFallbackType} alt={item.alt} />
          </div>
        )}

        {/* Hover overlay with zoom button */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            type="button"
            onClick={() => onZoom(item)}
            className="p-2 rounded-full bg-[#00f2fe]/90 hover:bg-[#00f2fe] text-slate-950 shadow-md font-bold text-xs flex items-center gap-1.5 transition-transform scale-90 group-hover:scale-100 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Збільшити</span>
          </button>
        </div>
      </div>

      <div className="p-4 bg-[#1b1f28] border-t border-slate-800/60 space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-white group-hover:text-[#00f2fe] transition-colors line-clamp-1">
            {item.titleUa}
          </h4>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {item.alt}
          </p>
        </div>
        <div className="pt-2 border-t border-slate-800/40 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>FILE: {item.src}</span>
          <span className="text-[#00f2fe] uppercase text-[9px] tracking-wider px-1.5 py-0.5 rounded bg-[#00f2fe]/5 border border-[#00f2fe]/10">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<"uk" | "en">("uk");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("theory");
  const [expandedImage, setExpandedImage] = useState<ImageDescriptor | null>(null);

  // Contact form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Interactive Simulator parameters
  const [crosstalkLevel, setCrosstalkLevel] = useState(70);
  const [sciEnabled, setSciEnabled] = useState(false);
  const [entropyRate, setEntropyRate] = useState(70);
  const [decryptionRate, setDecryptionRate] = useState(30);

  // Compute metrics dynamically based on simulator input
  useEffect(() => {
    if (sciEnabled) {
      // With SCI enabled, entropy collapses to 0 and decryption succeeds fully.
      // High crosstalk without SCI means high error, but SCI neutralizes crosstalk balance
      setEntropyRate(0);
      setDecryptionRate(100);
    } else {
      // Dynamic computation representing untreated physics: more crosstalk -> more noise, higher entropy, fewer decrypted bits
      const calculatedEntropy = Math.round(crosstalkLevel * 1.1);
      const calculatedDecryption = Math.max(0, 100 - calculatedEntropy);
      setEntropyRate(Math.min(100, calculatedEntropy));
      setDecryptionRate(calculatedDecryption);
    }
  }, [crosstalkLevel, sciEnabled]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formName.trim() || !formEmail.trim() || !formMsg.trim()) {
      setFormError(lang === "uk" ? "Будь ласка, заповніть усі поля." : "Please fill in all input fields.");
      return;
    }
    if (!formEmail.includes("@")) {
      setFormError(lang === "uk" ? "Введіть коректну електронну адресу." : "Please enter a valid email address.");
      return;
    }

    setIsSubmitted(true);
  };

  const handleCopyBib = () => {
    navigator.clipboard.writeText(BIBTEX_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#1e222b] text-slate-300 font-sans leading-relaxed selection:bg-[#00f2fe]/20 selection:text-white">
      
      {/* Decorative spectrum bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-[#00f2fe] to-indigo-500 sticky top-0 z-50 shadow-md" />

      {/* Header and Brand */}
      <header className="border-b border-slate-800 bg-[#1e222b] sticky top-1.5 z-40 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[#11141a] border border-[#00f2fe]/30 flex items-center justify-center text-[#00f2fe] shadow-inner font-mono font-bold tracking-wider text-sm">
              SCI
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#00f2fe] tracking-widest block uppercase font-bold">
                Closed Spectral System
              </span>
              <span className="font-extrabold text-white text-base sm:text-lg tracking-tight block -mt-1 uppercase">
                Model SCI // RSS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Switch */}
            <div className="flex bg-[#11141a] p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setLang("uk")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  lang === "uk" 
                    ? "bg-[#00f2fe] text-slate-950 shadow-md" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                УКР
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  lang === "en" 
                    ? "bg-[#00f2fe] text-slate-950 shadow-md" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                ENG
              </button>
            </div>

            {/* Anchor jump button */}
            <a 
              href="#collaboration" 
              className="hidden md:flex text-xs bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 px-4 py-2 rounded-lg transition-colors items-center gap-2"
            >
              <span>{lang === "uk" ? "Зворотний зв'язок" : "Inquire Now"}</span>
              <ArrowRight className="w-4 h-4 text-[#00f2fe]" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Header Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-800 bg-gradient-to-b from-[#151921] to-[#1e222b]">
        {/* Subtle matrix overlay */}
        <div className="absolute inset-x-0 top-0 h-full opacity-5 bg-[linear-gradient(to_right,#00f2fe_1px,transparent_1px),linear-gradient(to_bottom,#00f2fe_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/20 text-[#00f2fe] text-[11px] font-mono uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 animate-pulse" />
            <span>Scientific Portal // Academic Preprint</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {lang === "uk" 
              ? "Модель SCI: Математичний міст між цифровим світлом та фізичним пігментом"
              : "The SCI Model: A Mathematical Bridge between Digital Light and Physical Pigments"
            }
          </h1>

          <p className="text-lg sm:text-xl font-medium text-[#00f2fe] max-w-3xl mx-auto leading-relaxed">
            {lang === "uk"
              ? "Фундаментальний алгоритм спектральної гомогенізації середовищ для комп'ютерного зору, стеганографії та високоточного відтворення кольору."
              : "Fundamental algorithm for physical medium spectral homogenization targeted on computer-assisted vision, steganography, and strict chromatic reproduction."
            }
          </p>

          <p className="text-slate-400 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            {lang === "uk"
              ? "Цифрові екрани випромінюють світло (RGB), а фізичні носії — відбивають його (CMYK). Цей розрив створює хаос і втрату даних. Проект SCI (Spectral Channel Isolation) повністю вирішує цю проблему, переводячи фізику взаємодії фарб у структуру детермінованої математичної моделі."
              : "Digital monitors emit radiant light rays (RGB) while physical media rely on subtractive pigment reflections (CMYK). This disparity triggers severe entropy and signal degradation. The SCI (Spectral Channel Isolation / Systems of Spectral Constants) initiative bridges this physical divergence via deterministic mathematical formulations."
            }
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 text-left">
            <div className="bg-[#11141a]/60 border border-slate-800 p-3 rounded-lg text-center font-mono">
              <span className="block text-slate-500 text-[10px] uppercase">Entropy Limit</span>
              <span className="text-white text-base font-bold text-[#00f2fe]">H &rarr; 0.0</span>
            </div>
            <div className="bg-[#11141a]/60 border border-slate-800 p-3 rounded-lg text-center font-mono">
              <span className="block text-slate-500 text-[10px] uppercase">Layer isolation</span>
              <span className="text-white text-base font-bold text-[#00f2fe]">100% Strict</span>
            </div>
            <div className="bg-[#11141a]/60 border border-slate-800 p-3 rounded-lg text-center font-mono">
              <span className="block text-slate-500 text-[10px] uppercase">Payload Containers</span>
              <span className="text-white text-base font-bold text-[#00f2fe]">Tri-Channel</span>
            </div>
            <div className="bg-[#11141a]/60 border border-slate-800 p-3 rounded-lg text-center font-mono">
              <span className="block text-slate-500 text-[10px] uppercase">Preprint Reference</span>
              <span className="text-white text-base font-bold text-[#00f2fe]">Zenodo OK</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* SECTION 1: Blueprints and Hero Schematic */}
        <section className="bg-[#13161e] rounded-2xl border border-slate-800 p-6 sm:p-10 space-y-8 shadow-2xl relative">
          <div className="absolute right-4 top-4 text-slate-600 font-mono text-[11px]">SYS_MOD_CORE</div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00f2fe] uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Офіційна концептуальна модель</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {lang === "uk"
                  ? "Геометрична модель RSS (Reflective Spectral Stabilization)"
                  : "RSS (Reflective Spectral Stabilization) Analytical Geometry"
                }
              </h2>

              <p className="text-sm text-slate-400 font-mono leading-relaxed bg-[#1b1f28] p-3 rounded-lg border border-slate-800/80">
                {lang === "uk"
                  ? "Індустрія класичної та комерційної поліграфії традиційно прагне до суб'єктивної яскравості та комерційної соковитості, що робить точну передачу окремих прихованих спектрів неможливою. Модель SCI свідомо не намагається «вилікувати» фізичний crosstalk пігментів, а будує збалансовану закриту матрицю стабілізації."
                  : "Traditional commercial printing practices optimize for arbitrary subjective high-contrast brightness, causing severe multi-channel decode failures. The SCI model establishes absolute predictability instead by formalizing uniform color response plateaus."
                }
              </p>

              <div className="text-slate-300 text-sm leading-relaxed space-y-3">
                <p>
                  {lang === "uk"
                    ? "Універсальний математичний опис системи закритих констант формується у виділеному хроматичному просторі за рахунок примусового вирівнювання інтегрального колірного відбитку для всіх зон під заданою довжиною світлової хвилі спостереження."
                    : "The unified algebraic constraints bound the physical ink responses to strict limits, suppressing chromatic entropy and protecting signal isolation rules from substrate fluctuations."
                  }
                </p>
                
                {/* Embedded Math Highlight Box */}
                <div className="bg-[#0f1218] p-4 rounded-xl border border-slate-800/80 font-mono flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Математичний інтеграл стабілізації:</div>
                    <code className="text-xs sm:text-sm text-white font-bold block mt-1 math-font">
                      &int; R_i(&lambda;) &bull; S(&lambda;) d&lambda; = const (C)
                    </code>
                  </div>
                  <div className="text-[10px] text-slate-400 text-left sm:text-right max-w-xs italic leading-normal">
                    {lang === "uk"
                      ? "Де R_i — відбивна спектральна характеристика i-ї зони, S — світлова функція випромінювача."
                      : "Where R_i denotes spectral reflectance efficiency of sector i, and S denotes emitter distribution."
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Render safe blueprint component in col-span-5 */}
            <div className="lg:col-span-5">
              <SafeLoadImage 
                item={SCI_IMAGE_ASSETS[0]} 
                onZoom={(img) => setExpandedImage(img)} 
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: Crosstalk and Information Destruction */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          <div className="lg:col-span-5 order-last lg:order-first">
            <SafeLoadImage 
              item={SCI_IMAGE_ASSETS[1]} 
              onZoom={(img) => setExpandedImage(img)} 
            />
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest">
              <ShieldAlert className="w-4 h-4" />
              <span>Аналіз фізичних викривлень // Subtractive Degradation</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {lang === "uk"
                ? "Руйнування інформації: Міжканальна інтерференція та Crosstalk"
                : "Information Decay: Inter-channel Crosstalk & Subtractive Interference"
              }
            </h2>

            <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
              <p>
                {lang === "uk"
                  ? "Чому комп'ютерний зір «сліпне», а принтери спотворюють колір? При нанесенні на субстрат (папір, полотно) чисті канали даних неминуче перекривають один одного. Паразитне поглинання світла створює хроматичний шум."
                  : "Why do automated scanning cameras make errors while interpreting physical prints? Upon transferring clean data layers onto an analog substrate, separate color channels overlap automatically because physical molecules possess imperfect absorption tolerances."
                }
              </p>
              <p className="bg-[#1b1f28] p-4 rounded-xl border border-red-500/10 text-slate-400 font-medium">
                {lang === "uk"
                  ? "Наш аналіз показує, як реальний друк руйнує вихідну математичну логіку, перетворюючи ізольовані канали на хаотичну суміш. В традиційному RGB-CMYK перенесенні взаємозалежні поглинання пігментів Magenta та Cyan стирають тонкі унікальні двійкові кодовані біти під товщею системного шуму."
                  : "Our colorimetry research registers massive signal decay outside normalized systems. Parasitic absorptance inside complex violet hues wipes out encoded sub-matrices under high-frequency analog noise overlap."
                }
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Entropy Limiting & Plateau Equalization */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f2fe] uppercase tracking-widest">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Філософія системного лімітування</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {lang === "uk"
                ? "Рішення: Метод примусового лімітування ентропії"
                : "The Solution: Enforced Entropy Suppression Plateau"
              }
            </h2>

            <div className="text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                {lang === "uk"
                  ? "Замість спроб «розтягнути» слабкі фарби, алгоритм SCI діє принципово інакше: він штучно занижує характеристики сильних каналів до рівня «найслабшої ланки» системи. Ми створюємо ідеально рівне спектральне плато."
                  : "Rather than attempt to artificially expand weak color pigments, the SCI algorithm implements defensive leveling: it digitally suppresses high-performing, bright channels (such as pure yellow) down to the exact baseline of the weakest node (the complex violet overlap)."
                }
              </p>
              <p className="text-slate-400">
                {lang === "uk"
                  ? "Хаос і асиметрія зникають — система приводиться до стабільної енергетичної константи, повертаючи каналам 100% ізоляцію. Оскільки відносні спектральні пропорції на фізичному носії зберігаються без спотворень, процес стає повністю реверсивним за рахунок лінійного нормування контрасту в зворотному оптичному софті."
                  : "Chaos and substrate asymmetry completely decay. The entire spectrum is governed by a flat, stable energy constant, rendering up to 100% channel isolation and clean linear contrast reversibility during computer scanning."
                }
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <SafeLoadImage 
              item={SCI_IMAGE_ASSETS[2]} 
              onZoom={(img) => setExpandedImage(img)} 
            />
          </div>
        </section>

        {/* INTERACTIVE SPECTRAL CALIBRATION SIMULATOR WIDGET */}
        <section className="bg-[#151921] rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f2fe]/5 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#00f2fe] block font-bold">
                Interactive Lab Demo
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {lang === "uk" ? "Інтерактивний симулятор спектральної стійкості (SCI)" : "Interactive Inter-channel Crosstalk & SCI Simulator"}
              </h3>
            </div>
            
            <button 
              onClick={() => {
                setSciEnabled(!sciEnabled);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                sciEnabled 
                  ? "bg-[#10b981] hover:bg-[#059669] text-white" 
                  : "bg-[#00f2fe] hover:bg-[#00d7e2] text-slate-950"
              }`}
            >
              {sciEnabled ? <ShieldCheck className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
              <span>
                {sciEnabled 
                  ? (lang === "uk" ? "SCI СТАБІЛІЗАЦІЯ: УВІМКНЕНО" : "SCI EQUALIZATION: ENGAGED") 
                  : (lang === "uk" ? "УВІМКНУТИ МОДЕЛЮВАННЯ SCI" : "ENGAGE SCI ALGORITHM")
                }
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Control panel col-span-5 */}
            <div className="md:col-span-5 space-y-5 bg-[#1b1f28]/60 p-5 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-slate-400 block border-b border-slate-800 pb-2">
                Параметри аналогового друку:
              </span>

              {/* Slider 1: Crosstalk interference level */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Рівень Crosstalk фарби:</span>
                  <span className="text-[#00f2fe] font-bold">{crosstalkLevel}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="95" 
                  value={crosstalkLevel} 
                  disabled={sciEnabled}
                  onChange={(e) => setCrosstalkLevel(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#00f2fe] disabled:opacity-30"
                />
                <span className="text-[10px] text-slate-500 block">
                  Паразитний хроматичний шум поглинання за замовчуванням.
                </span>
              </div>

              {/* Status block with alerts */}
              <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs flex gap-3">
                {sciEnabled ? (
                  <>
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-emerald-400 font-bold block uppercase text-[10px]">Стабільний баланс</span>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Амплітуди приведено до загального плато. Оптичні канали повністю відокремлені.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <span className="text-amber-400 font-bold block uppercase text-[10px]">Втрата вихідних даних</span>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Сусідні RGB-канали зазнають замилювання на рівні {crosstalkLevel}%. Двійкові штрихкоди не читаються через паразитуючий шум.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Metrics and Visual Graph area col-span-7 */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
              
              {/* Dynamic bar charts displaying scientific entropy values */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">
                  Вимірювання ентропії
                </span>

                <div className="space-y-3">
                  {/* Metric Box 1: Entropy */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono pb-1">
                      <span>Системна ентропія:</span>
                      <span className={entropyRate > 50 ? "text-red-400" : "text-emerald-400"}>
                        {entropyRateRateString(entropyRate)}
                      </span>
                    </div>
                    <div className="w-full bg-[#1b1f28] h-3 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-teal-500 to-red-500"
                        style={{ width: `${entropyRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Metric Box 2: Secure Decoding Success */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono pb-1">
                      <span>Успішність дешифрування:</span>
                      <span className={decryptionRate < 50 ? "text-[#00f2fe]" : "text-[#10b981] font-bold"}>
                        {decryptionRate}%
                      </span>
                    </div>
                    <div className="w-full bg-[#1b1f28] h-3 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500 bg-[#00f2fe]"
                        style={{ width: `${decryptionRate}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 font-mono leading-normal leading-relaxed border-t border-slate-800/80 pt-2">
                  {sciEnabled 
                    ? "Результат: Ентропія прямує до абсолютного нуля. Відносні співвідношення зберігаються з математичною точністю."
                    : "Результат: Висока дисперсія світла. Перемішування інформації викликає критичні помилки декодування."
                  }
                </p>
              </div>

              {/* Visual simulated spectrum curve */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">
                    Спектральний сенсор:
                  </span>
                  <div className="h-24 w-full relative mt-4 border-b border-l border-slate-800 flex items-end">
                    
                    {/* Simulated curve lines */}
                    <svg className="w-full h-full absolute inset-0 text-xs" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {sciEnabled ? (
                        <>
                          {/* Symmetrical flat line representation */}
                          <line x1="20" y1="60" x2="80" y2="60" stroke="#00f2fe" strokeWidth="3" />
                          <line x1="20" y1="40" x2="20" y2="90" stroke="#00f2fe" strokeWidth="1" strokeDasharray="2,2" />
                          <line x1="80" y1="40" x2="80" y2="90" stroke="#00f2fe" strokeWidth="1" strokeDasharray="2,2" />
                        </>
                      ) : (
                        <>
                          {/* Overlapping messy wave representation */}
                          <path d="M 10 90 Q 30 10 50 90" fill="none" stroke="#eab308" strokeWidth="1.5" />
                          <path d="M 30 90 Q 55 15 80 90" fill="none" stroke="#ec4899" strokeWidth="1.5" />
                          <path d="M 50 90 Q 75 30 95 90" fill="none" stroke="#00f2fe" strokeWidth="1.5" />
                        </>
                      )}
                    </svg>

                    {/* Simulation badges */}
                    <div className="absolute right-2 top-2 font-mono text-[9px] text-[#00f2fe] bg-[#00f2fe]/5 px-1.5 py-0.5 rounded border border-[#00f2fe]/20">
                      {sciEnabled ? "PLATEAU FREQ_0" : "ASYMMETRICAL"}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 font-mono flex justify-between mt-2">
                  <span>CH_A (Y)</span>
                  <span>CH_B (M)</span>
                  <span>CH_C (C)</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: Steganography and QR.G.B.-ART Grid */}
        <section className="space-y-6 pt-4">
          <div className="space-y-2 text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f2fe] uppercase tracking-widest">
              <QrCode className="w-4 h-4" />
              <span>Шифрування та Практичне Застосування // Steganographic Matrices</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === "uk"
                ? "Стеганографія нового покоління: Матриці QR.G.B.-ART"
                : "Next-gen Steganography: QR.G.B.-ART Encryption Matrices"
              }
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              {lang === "uk"
                ? "Традиційні коди використовують лише чорно-білу геометрію. Технологія SCI дозволяє безконфліктно зашити три незалежні інформаційні контейнери (Червоний, Зелений, Синій) в один кольоровий масив. Більш того, завдяки повній ізоляції каналів, цей код можна інтегрувати в традиційні орнаменти та навіть наносити вручну акрилом на полотно. Розумна камера смартфона зчитає кожен шар без помилок, ігноруючи текстуру матеріалу."
                : "Standard barcodes are restricted to black-and-white geometries. The SCI model accommodates up to three entirely separate data layers (Red, Green, Blue sub-grids) inside a single chromatic block. Because spectral crosstalk is completely nullified by our stabilizing limiting curves, these layers can reside inside intricate visual mandalas or hand-applied artwork painted on canvas, remaining readable by standard mobile cameras."
              }
            </p>
          </div>

          {/* Steganography Grid containing relevant image objects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Displaying exactly the 5 steganography photos from requirements */}
            {SCI_IMAGE_ASSETS.slice(3).map((img, idx) => (
              <div key={idx} className="h-full">
                <SafeLoadImage item={img} onZoom={(zoomImg) => setExpandedImage(zoomImg)} />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: Soft Proofing & Theoretical Predictability */}
        <section className="bg-[#13161e] rounded-2xl border border-slate-800 p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/5 blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f2fe] uppercase tracking-wider">
              <Laptop className="w-4 h-4" />
              <span>Зворотний матричний оператор // Absolute Soft Proofing</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {lang === "uk"
                ? "Абсолютна передбачуваність: теоретична основа для цифрової симуляції фізичного носія"
                : "Absolute Control: Theoretical Basis for Simulation and Pure Soft Proofing"
              }
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === "uk"
                ? "На основі зворотного матричного оператора модель SCI створює математичну базу для розробки програмного забезпечення з абсолютного soft proofing. Така програма (у перспективі) дозволить художнику або поліграфісту бачити на екрані монітора не абстрактні пікселі, а фізично передбачувану поведінку пігментів на конкретному верстаті."
                : "Synthesizing the inverse matrix operator generates a flawless computational soft-proofing simulation system. This predictive pipeline will enable visual creators or industrial printers to compute exact pigment outputs in real-time, removing visual errors before liquid ink hits standard fibers."
              }
            </p>

            <p className="text-sm text-slate-400">
              {lang === "uk"
                ? "Кожен мазок кисті теоретично може бути попередньо розрахований з урахуванням майбутніх спектральних спотворень. Результат (після реалізації): те, що користувач бачить на моніторі, буде тотожним тому, що вийде з друку — без втрати інформації."
                : "Every individual stroke is pre-analyzed to adapt to future wavelength offsets. The immediate output ensures that what is approved on screen coordinates identically with what emerges in high-speed subtractive runs."
              }
            </p>

            {/* Simulated tool display representation */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <span className="text-slate-500 block">Operator Matrix:</span>
                <span className="text-white font-bold block mt-1">[P]_inv * [A]_rss</span>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <span className="text-slate-500 block">Softproofing state:</span>
                <span className="text-[#00f2fe] font-bold block mt-1">Delta-E &rarr; 0.0</span>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <span className="text-slate-500 block">Predictive confidence:</span>
                <span className="text-emerald-400 font-bold block mt-1">99.87% Deterministic</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Collaboration Form & Contact Coordinates */}
        <section id="collaboration" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* Info coordinates col-span-5 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f2fe] uppercase tracking-widest">
                <Mail className="w-4 h-4" />
                <span>Зворотний Зв'язок // Academic Interaction</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {lang === "uk"
                  ? "Стабілізація систем комп'ютерного зору. Запрошення до колаборації"
                  : "Stable Machine Vision Systems. Inquiry and Invitation"
                }
              </h2>

              <p className="text-sm text-slate-400 leading-relaxed">
                {lang === "uk"
                  ? "Модель SCI — це готова, математично доведена технологія, що відкриває нові ринки: від захищеного маркування товарів до революційного софту для digital-художників та геймдеву. Ми відкриті до співпраці з розробниками, індустріальними партнерами та інвесторами."
                  : "The SCI model is a verified, mathematically sound development establishing solid opportunities in cargo security markings, steganographic tags, and specialized artwork softproofing. We are eager to cooperate with scientific researchers and industrial engineering firms."
                }
              </p>
            </div>

            {/* Practical Contact links block */}
            <div className="bg-[#151921] rounded-xl border border-slate-800 p-5 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#00f2fe] font-bold">
                {lang === "uk" ? "Контакти автора" : "Contact Information"}
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#00f2fe]" />
                  <div>
                    <span className="text-slate-500 block uppercase text-[9px]">{lang === "uk" ? "Електронна пошта" : "Email Address"}</span>
                    <a href="mailto:bakminsterfuler@gmail.com" className="text-white hover:underline">
                      bakminsterfuler@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#00f2fe]" />
                  <div>
                    <span className="text-slate-500 block uppercase text-[9px]">{lang === "uk" ? "Телефонний кабель" : "Direct Phone Line"}</span>
                    <a href="tel:+380635058292" className="text-white hover:underline">
                      +380 63 505 8292
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Styled submission form col-span-7 */}
          <div className="lg:col-span-7 bg-[#13161e] border border-slate-800 p-6 sm:p-8 rounded-xl shadow-xl space-y-4 relative">
            <h3 className="text-lg font-bold text-white mb-2">
              {lang === "uk" ? "Надіслати офіційний запит" : "Send Collaboration Query"}
            </h3>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleFormSubmit} 
                  className="space-y-4 text-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                >
                  {formError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 rounded font-bold">
                      {formError}
                    </div>
                  )}

                  {/* Input 1: Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="formName" className="block text-slate-400 font-mono uppercase text-[10px]">
                      {lang === "uk" ? "Ім'я" : "Your Full Name"}
                    </label>
                    <input 
                      id="formName"
                      type="text" 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder={lang === "uk" ? "Михайло" : "John Doe"}
                      className="w-full bg-[#1b1f28] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2.5 outline-none transition-colors text-white"
                    />
                  </div>

                  {/* Input 2: Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="formEmail" className="block text-slate-400 font-mono uppercase text-[10px]">
                      {lang === "uk" ? "Електронна пошта" : "Your Email Address"}
                    </label>
                    <input 
                      id="formEmail"
                      type="text" 
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="developer@model-sci.org"
                      className="w-full bg-[#1b1f28] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2.5 outline-none transition-colors text-white"
                    />
                  </div>

                  {/* Input 3: Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="formMsg" className="block text-slate-400 font-mono uppercase text-[10px]">
                      {lang === "uk" ? "Повідомлення" : "Your Project Proposal"}
                    </label>
                    <textarea 
                      id="formMsg"
                      rows={4}
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      placeholder={lang === "uk" ? "Опишіть пропозицію наукової співпраці..." : "Describe your cooperative purpose..."}
                      className="w-full bg-[#1b1f28] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2.5 outline-none transition-colors text-white resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full bg-[#00f2fe] hover:bg-[#00d7e2] text-slate-950 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <span>{lang === "uk" ? "Надіслати запит" : "Transmit Query"}</span>
                    <Send className="w-4 h-4 text-slate-950" />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-form"
                  className="py-12 text-center space-y-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-[#10b981]">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    {lang === "uk" ? "Запит успішно надіслано!" : "Query Sent Successfully!"}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    {lang === "uk" 
                      ? "Дякуємо за інтерес до нашого наукового проекту. Михайло Кашкаров зв'яжеться з вами найближчим часом." 
                      : "Thank you for supporting scientific integrity. Mykhailo Kashkarov will reply to your proposal shortly."}
                  </p>
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormName("");
                      setFormEmail("");
                      setFormMsg("");
                    }}
                    className="text-xs text-[#00f2fe] underline mt-4"
                  >
                    {lang === "uk" ? "Написати інше повідомлення" : "Transmit another form"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* SECTION 7: Academic Citations and Bibliography */}
        <section className="bg-[#151921] rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-5 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="text-[#00f2fe] w-5 h-5" />
              <h3 className="text-base font-bold text-white tracking-tight">
                {lang === "uk" ? "Академічні ресурси & Посилання" : "Academic Resources & Metadata"}
              </h3>
            </div>

            {/* Quick access buttons list */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <a 
                href="https://zenodo.org/records/19633526"
                target="_blank"
                className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded border border-slate-700 transition-colors flex items-center gap-1.5"
                referrerPolicy="no-referrer"
              >
                <span>Zenodo (Preprint)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://github.com/Astra31415926/spectral-color-model"
                target="_blank"
                className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded border border-slate-700 transition-colors flex items-center gap-1.5"
                referrerPolicy="no-referrer"
              >
                <span>GitHub Repo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Scientific bibliography coordinates */}
            <div className="md:col-span-4 text-xs space-y-4">
              <p className="text-slate-400">
                {lang === "uk"
                  ? "Для посилання на дане дослідження у ваших академічних працях, кандидатських дисертаціях або патентах, будь ласка, використовуйте офіційний ідентифікатор DOI Zenodo."
                  : "To cite this scientific initiative in your journal papers, dissertations, or patent filings, please reference the official Zenodo DOI."
                }
              </p>

              <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1 text-[11px] font-mono">
                <span className="text-slate-500 block uppercase text-[8px]">Preprint ID:</span>
                <span className="text-white font-bold block">10.5281/zenodo.19633526</span>
                <span className="text-slate-500 block uppercase text-[8px] mt-2">Related tools:</span>
                <a href="https://astra31415926.github.io/QRnament2/" target="_blank" className="text-[#00f2fe] block hover:underline" referrerPolicy="no-referrer">↳ QRnament2 Generator</a>
                <a href="https://astra31415926.github.io/QR.G.B.-ART/" target="_blank" className="text-[#00f2fe] block hover:underline" referrerPolicy="no-referrer">↳ Spectrum RGB Art</a>
              </div>
            </div>

            {/* BibTeX copy box col-span-8 */}
            <div className="md:col-span-8 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">BibTeX Format Citation:</span>
                <button 
                  onClick={handleCopyBib}
                  className="text-[#00f2fe] hover:text-[#00d7e2] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (lang === "uk" ? "Скопійовано!" : "Copied!") : (lang === "uk" ? "Копіювати BibTeX" : "Copy BibTeX")}</span>
                </button>
              </div>

              <pre className="bg-slate-950 text-slate-300 p-4 rounded-xl border border-slate-800 text-[10px] sm:text-xs font-mono select-all overflow-x-auto whitespace-pre leading-normal">
                {BIBTEX_TEXT}
              </pre>
            </div>
          </div>
        </section>

      </main>

      {/* Footer copyright */}
      <footer className="border-t border-slate-800/80 bg-[#151921] mt-16 py-8 text-xs font-mono text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold tracking-tight text-[11px]">SCI_PORTAL // 2026</span>
            <span>&bull;</span>
            <span>Created for Mykhailo Kashkarov academic index</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SPECTRAL INTEGRITY CONFIRMED</span>
          </div>
        </div>
      </footer>

      {/* MODAL ZOOM VIEWER */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div 
            className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImage(null)}
          >
            <motion.div 
              className="bg-[#1b1f28] border border-slate-800 max-w-3xl w-full rounded-2xl overflow-hidden relative shadow-2xl flex flex-col"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                type="button"
                onClick={() => setExpandedImage(null)}
                className="absolute right-3 top-3 p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-white transition-colors cursor-pointer z-50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/3] bg-slate-950 flex items-center justify-center p-2">
                {/* Visual check if true file is missing to supply gorgeous vectors inside zoomed view too! */}
                <div className="w-full h-full">
                  <VectorVariantHelper image={expandedImage} />
                </div>
              </div>

              <div className="p-5 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    {lang === "uk" ? expandedImage.titleUa : expandedImage.titleEn}
                  </h3>
                  <span className="text-[10px] font-mono text-[#00f2fe] uppercase border border-[#00f2fe]/20 px-2 py-0.5 rounded bg-[#00f2fe]/5">
                    {expandedImage.category}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {expandedImage.alt}
                </p>

                <div className="pt-3 border-t border-slate-800/40 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Image Resource Field: "{expandedImage.src}"</span>
                  <span>ISO_STABILIZED_CONSTANT_BOUNDS_TRUE</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Notifications */}
      <AnimatePresence>
        {copied && (
          <motion.div 
            className="fixed bottom-6 right-6 z-50 bg-[#11141a] border border-[#00f2fe]/40 text-white rounded-lg px-4 py-3 shadow-[0_4px_24px_rgba(0,242,254,0.15)] flex items-center gap-2.5 max-w-sm"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <Sparkles className="w-4 h-4 text-[#00f2fe] shrink-0" />
            <span className="text-xs font-semibold">
              {lang === "uk" ? "BibTeX цитування скопійовано!" : "BibTeX citation copied!"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- Dynamic Vector zoomed inside Modal tool ---
function VectorVariantHelper({ image }: { image: ImageDescriptor }) {
  const [errImg, setErrImg] = useState(false);

  if (!errImg) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        onError={() => setErrImg(true)}
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-[#11141a]">
      <VectorFallback type={image.svgFallbackType} alt={image.alt} />
    </div>
  );
}

function entropyRateRateString(rate: number): string {
  if (rate === 0) return "0.0% [Absolute Determinism]";
  if (rate > 70) return `${rate}% [Critical Loss]`;
  return `${rate}% [High Variance]`;
}

// --- Constant Bibliography Payload Object ---
const BIBTEX_TEXT = `@article{kashkarov2025closed,
  author    = {Kashkarov, Mykhailo},
  title     = {Closed System of Spectral Constants (Spectral Channel Integrity)},
  journal   = {Zenodo Preprint Archive},
  year      = {2025},
  url       = {https://zenodo.org/records/19633526},
  doi       = {10.5281/zenodo.19633526}
}`;
